import React from "react";

function ImagePopUp({isOpen, onClose, card}) {
  return (
    <div className={`pop-up pop-up_background_dark ${isOpen ? "pop-up_opened" : ""}`} id="pop-up_open">
      <div className="pop-up__content">
        <button
          aria-label="Закрыть"
          type="button"
          className="pop-up__close-button"
          onClick={onClose}
        ></button>
        <figure className="pop-up__figure">
          <img className="pop-up__image" src={card.link} alt={card.name} />
          <figcaption className="pop-up__place-name">{card.name}</figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopUp;
