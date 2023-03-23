import { useRef, useEffect, useContext } from "react";
import { CurrentUserContext } from '../context/CurrentUserContext';
import PopUpWithForm from "./PopupWithForm";
import FormValidator from '../utils/FormValidator';

function EditAvatarPupup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const currentUser = useContext(CurrentUserContext);
  const avatar = useRef();

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({ avatar: avatar.current.value });
  }

  function handleChangeAvatar(e) {
    handleChange(e, ".pop-up__form");
  }

  const {
    errors,
    isValid,
    handleChange,
    resetForm
  } = FormValidator({});

  useEffect(() => {
    resetForm();
    avatar.current.value = currentUser.avatar;
  }, [isOpen, resetForm, currentUser]);

  return (
    <PopUpWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      name="edit-avatar"
      submit={`Сохранить${isLoading ? '...' : ''}`}
      title="Обновить аватар"
      isValid={isValid}
    >
      <label className="pop-up__field">
        <input
          ref={avatar}
          id="avatar-link"
          type="url"
          name="avatar"
          className={`pop-up__input${errors.avatar ? ' pop-up__input_type_error' : ''}`}
          onChange={handleChangeAvatar}
          placeholder="Ссылка на картинку"
          required
        />
        <span 
          className={errors.avatar ? 'pop-up__input-error pop-up__input-error_active' : 'pop-up__input-error'}
        >
          {errors.avatar}
        </span>
      </label>
    </PopUpWithForm>
  );
}

export default EditAvatarPupup;
