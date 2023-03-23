import React from 'react';
import PopUpWithForm from './PopupWithForm';

function ConfirmationPopup({isOpen, onClose, onConfirm}) {
  function handleSubmit(evt) {
    evt.preventDefault();
    onConfirm();
  }

  return (
    <PopUpWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      name="edit-avatar"
      submit="Да"
      title="Вы уверены?"
      isValid={true}
    />
  )
}

export default ConfirmationPopup;