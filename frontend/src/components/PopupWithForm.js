import React from "react";

function PopUpWithForm({isOpen, name, onClose, title, children, submit, onSubmit, isValid}) {
    return (
    <div
      className={`pop-up ${isOpen ? "pop-up_opened" : ""}`}
      id={`pop-up_${name}`}
    >
      <div className="pop-up__content">
        <button
          aria-label="Закрыть"
          type="button"
          className="pop-up__close-button"
          onClick={onClose}
        ></button>
        <form 
          className="pop-up__form" 
          name={name}
          onSubmit={onSubmit}
          noValidate
        >
          <h3 className="pop-up__title">{title}</h3>
          {children}
          <button
            type="submit"
            className={`pop-up__submit-button pop-up__save-button${isValid ? '' : ' pop-up__submit-button_inactive'}`}
            disabled={!isValid}
          >
            {submit}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopUpWithForm;
