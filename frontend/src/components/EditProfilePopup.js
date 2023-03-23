import { useContext, useEffect, useState } from 'react';
import { CurrentUserContext } from '../context/CurrentUserContext';
import PopUpWithForm from './PopupWithForm';
import FormValidator from '../utils/FormValidator';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const {
    errors,
    isValid,
    handleChange,
    resetForm
  } = FormValidator({});

  useEffect(() => {
    resetForm();
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen, resetForm]);

  function handleChangeName(e) {
    setName(e.target.value);
    handleChange(e, ".pop-up__form")
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
    handleChange(e, ".pop-up__form")
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({name: name, about: description});
  }

  return (
    <PopUpWithForm
          isOpen={isOpen}
          onClose={onClose}
          name="edit"
          submit={`Сохранить${isLoading ? '...' : ''}`}
          title="Редактировать профиль"
          onSubmit={handleSubmit}
          isValid={isValid}
        >
          <label className="pop-up__field">
            <input
              id="profile-name"
              type="text"
              name="name"
              className={`pop-up__input${errors.name ? ' pop-up__input_type_error' : ''}`}
              placeholder="Имя"
              minLength="2"
              maxLength="40"
              value={name || ''}
              onChange={handleChangeName}
              required
            />
            <span
              className={errors.name ? 'pop-up__input-error pop-up__input-error_active' : 'pop-up__input-error'}
            >
              {errors.name}
            </span>
          </label>
          <label className="pop-up__field">
            <input
              id="about"
              type="text"
              name="about"
              className={`pop-up__input${errors.about ? ' pop-up__input_type_error' : ''}`}
              placeholder="О себе"
              minLength="2"
              maxLength="200"
              value={description || ''}
              onChange={handleChangeDescription}
              required
            />
            <span
              className={errors.about ? 'pop-up__input-error pop-up__input-error_active' : 'pop-up__input-error'}
            >
              {errors.about}
            </span>
          </label>
    </PopUpWithForm>
  )
}

export default EditProfilePopup