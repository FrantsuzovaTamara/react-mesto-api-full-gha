import React from "react";

export function InfoTooltip({ data, isOpen, onClose }) {
  return (
    <div
      className={`pop-up ${isOpen ? "pop-up_opened" : ""}`}
      id={`pop-up_${data.name}`}
    >
      <div className="pop-up__content">
        <button
          aria-label="Закрыть"
          type="button"
          className="pop-up__close-button"
          onClick={onClose}
        ></button>
        <div className="pop-up__attention">
          <img className="pop-up__icon" src={data.src} alt={data.alt} />
          <h3 className="pop-up__title pop-up__title_attention">{data.title}</h3>
        </div>
      </div>
    </div>
  );
}
