import { useEffect, useState } from 'react';
import PopUpWithForm from "./PopupWithForm";
import FormValidator from '../utils/FormValidator';

function AddPlacePopup({ isOpen, onClose, onAddCard, isLoading }) {
  const [cardName, setCardName] = useState('');
  const [cardLink, setCardLink] = useState('');

  const {
    errors,
    isValid,
    handleChange,
    resetForm
  } = FormValidator({});

  useEffect(() => {
    setCardName('');
    setCardLink('')
    resetForm();
}, [isOpen, resetForm]);

  function handleChangeCardName(e) {
    setCardName(e.target.value);
    handleChange(e, ".pop-up__form");
  }

  function handleChangeCardLink(e) {
    setCardLink(e.target.value);
    handleChange(e, ".pop-up__form");
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddCard({
      name: cardName,
      link: cardLink
    })
  }

  return (
    <PopUpWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      name="add"
      submit={`Создать${isLoading ? '...' : ''}`}
      title="Новое место"
      isValid={isValid}
    >
      <label className="pop-up__field">
        <input
          id="name"
          type="text"
          name="name"
          className={`pop-up__input${errors.name ? ' pop-up__input_type_error' : ''}`}
          placeholder="Название"
          minLength="2"
          maxLength="30"
          onChange={handleChangeCardName}
          value={cardName}
          required
        />
        <span
        className={errors.name ? 'pop-up__input-error pop-up__input-error_active' : 'pop-up__input-error'}
        id='avatar-url-error'
        role="status"
        aria-live="polite"
        >
          {errors.name}
        </span>
      </label>
      <label className="pop-up__field">
        <input
          id="link"
          type="url"
          name="link"
          className={`pop-up__input${errors.link ? ' pop-up__input_type_error' : ''}`}
          placeholder="Ссылка на картинку"
          onChange={handleChangeCardLink}
          value={cardLink}
          required
        />
        <span
        className={errors.link ? 'pop-up__input-error pop-up__input-error_active' : 'pop-up__input-error'}
        id='avatar-url-error'
        role="status"
        aria-live="polite"
        >
          {errors.link}
        </span>
      </label>
    </PopUpWithForm>
  );
}

export default AddPlacePopup;
