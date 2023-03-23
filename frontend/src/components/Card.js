import {useContext} from "react";
import { CurrentUserContext } from '../context/CurrentUserContext.js';

function Card({ onCardClick, card, onCardLike, onCardDelete }) {
  const userData= useContext(CurrentUserContext);
  const isLiked = card.likes.some(i => i._id === userData._id);
  const cardLikeButtonClassName = ( 
    `card__like-button ${isLiked && 'card__like-button_active'}` 
  );

  function handleClick() {
    onCardClick(card);
  }

  function handleLike() {
    onCardLike(card);
  }

  function handleDelete() {
      onCardDelete(card);
  }

  return (
    <li className="card">
      {(card.owner._id === userData._id) && <button
        type="button"
        className="card__delete-button"
        aria-label="Удалить"
        onClick={handleDelete}
      ></button>}
      <img className="card__image" src={card.link} alt={card.name} onClick={handleClick} />
      <div className="card__text">
        <h2 className="card__place-name">{card.name}</h2>
        <div className="card__like">
          <button
            type="button"
            className={cardLikeButtonClassName}
            aria-label="Нравится"
            onClick={handleLike}
          ></button>
          <p className="card__likes-number">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;