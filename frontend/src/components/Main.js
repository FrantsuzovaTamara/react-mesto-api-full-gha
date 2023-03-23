import { useContext } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext.js";
import Card from "./Card.js";

function Main({
  cards,
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  onCardLike,
  onCardDelete
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__main-info">
          <div onClick={onEditAvatar} className="profile__avatar-overlay">
            <img
              className="profile__avatar"
              src={currentUser.avatar}
              alt="Аватар
                пользователя"
            />
          </div>
          <div className="profile__info">
            <div className="profile__description">
              <h1 className="profile__name">{currentUser.name}</h1>
              <p className="profile__about">{currentUser.about}</p>
            </div>
            <button
              onClick={onEditProfile}
              aria-label="Изменить"
              type="button"
              className="profile__edit-button"
            ></button>
          </div>
        </div>
        <button
          onClick={onAddPlace}
          type="button"
          aria-label="Добавить карточку"
          className="profile__add-button"
        ></button>
      </section>

      <section className="content">
        <ul className="cards">
          {cards.map((card) => (
            <Card
              onCardClick={onCardClick}
              key={card._id}
              card={card}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;