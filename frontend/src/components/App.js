import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import fail from "../images/pop-up__fail.svg";
import success from "../images/pop-up__success.svg";

import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";

import ImagePopUp from "./ImagePopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPupup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import ConfirmationPopup from "./ConfirmationPopup.js";
import { InfoTooltip } from "./InfoTooltip";

import { Login } from "./Login.js";
import { Register } from "./Register.js";
import ProtectedRoute from "./ProtectedRoute.js";

import api from "../utils/Api.js";
import * as Auth from "../utils/Auth";

import { CurrentUserContext } from "../context/CurrentUserContext.js";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [deletedCard, setDeletedCard] = useState({});

  const [userData, setUserData] = useState({});

  const [loggedIn, setLoggedIn] = useState(false);

  const [isSelectedCardPopupOpen, setIsSelectedCardPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);
  const [isInfoToolOpen, setIsInfoToolOpen] = useState(false);

  const [infoToolData, setInfoToolData] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    handleTokenCheck();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getCards()])
        .then(([userData, cards]) => {
          setCurrentUser(userData);
          setCards(cards);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  function handleOpenInfoTool(data) {
    setInfoToolData(data);
    setIsInfoToolOpen(!isInfoToolOpen);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleDeleteButtonClick(card) {
    setIsConfirmationPopupOpen(!isConfirmationPopupOpen);
    setDeletedCard(card);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsSelectedCardPopupOpen(!isSelectedCardPopupOpen);
  }

  function closeAllPopUps() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsSelectedCardPopupOpen(false);
    setIsConfirmationPopupOpen(false);
    setIsInfoToolOpen(false);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete() {
    api
      .deleteCardInApi(deletedCard._id)
      .then((res) => {
        closeAllPopUps();
        setCards(cards.filter((c) => c._id !== deletedCard._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser(userData) {
    setIsLoading(true);
    api
      .editProfileInfo(userData)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopUps();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar(avatar) {
    setIsLoading(true);
    api
      .editAvatar(avatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopUps();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleAddPlaceSubmit(place) {
    setIsLoading(true);
    api
      .addCardInApi(place)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopUps();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleLogin({ email, password }) {
    return Auth.authorize(email, password)
      .then((data) => {
        localStorage.setItem("jwt", JSON.stringify(data.token));
        setLoggedIn(true);
        setUserData({
          email: email,
          password: password,
        });
        navigate("/react-mesto-auth/my-profile");
      })
      .catch((err) => {
        console.log(err);
        handleOpenInfoTool({
          src: fail,
          alt: "Ошибка",
          name: "fail",
          title: "Что-то пошло не так! Попробуйте ещё раз.",
        });
      });
  }

  function handleRegister({ password, email }) {
    return Auth.register(password, email)
      .then(() => {
        handleOpenInfoTool({
          src: success,
          alt: "Успешно",
          name: "fail",
          title: "Вы успешно зарегистрировались!",
        });
        navigate("/react-mesto-auth/sign-in");
      })
      .catch((err) => {
        console.log(err);
        handleOpenInfoTool({
          src: fail,
          alt: "Ошибка",
          name: "fail",
          title: "Что-то пошло не так! Попробуйте ещё раз.",
        });
      });
  }

  function handleTokenCheck() {
    const jwt = JSON.parse(localStorage.getItem("jwt"));
    if (jwt) {
      Auth.checkToken(jwt)
      .then((res) => {
        if (res) {
          setUserData({
            email: res.data.email,
          });
          setLoggedIn(true);
          navigate("/react-mesto-auth/my-profile", { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }

  function signOut() {
    localStorage.removeItem("jwt");
    setUserData({
      email: "",
      password: "",
    });
    setLoggedIn(false);
    navigate("/react-mesto-auth/sign-in", { replace: true });
  }

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Header loggedIn={loggedIn} email={userData.email} signOut={signOut} />

        <Routes>
          <Route
            path="/react-mesto-auth/"
            element={
              loggedIn ? (
                <Navigate to="/react-mesto-auth/my-profile" replace />
              ) : (
                <Navigate to="/react-mesto-auth/sign-in" replace />
              )
            }
          />
          <Route
            path="/react-mesto-auth/sign-in"
            element={<Login handleLogin={handleLogin} />}
          />
          <Route
            path="/react-mesto-auth/sign-up"
            element={<Register handleRegister={handleRegister} />}
          />
          <Route
            path="/react-mesto-auth/my-profile"
            element={
              <ProtectedRoute
                component={Main}
                loggedIn={loggedIn}
                cards={cards}
                onEditAvatar={handleEditAvatarClick}
                onAddPlace={handleAddPlaceClick}
                onEditProfile={handleEditProfileClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleDeleteButtonClick}
              />
            }
          />
        </Routes>

        <Footer />

        <EditAvatarPupup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopUps}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopUps}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopUps}
          onAddCard={handleAddPlaceSubmit}
          isLoading={isLoading}
        />

        <ConfirmationPopup
          isOpen={isConfirmationPopupOpen}
          onClose={closeAllPopUps}
          onConfirm={handleCardDelete}
        />

        <ImagePopUp
          card={selectedCard}
          isOpen={isSelectedCardPopupOpen}
          onClose={closeAllPopUps}
        />

        <InfoTooltip
          data={infoToolData}
          isOpen={isInfoToolOpen}
          onClose={closeAllPopUps}
        />
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
