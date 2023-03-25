import React from "react";

class Api extends React.Component {
  constructor(props) {
    super(props)
    this._baseUrl = props.baseUrl;
    this._contentType = props.headers['Content-Type'];
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${JSON.parse(localStorage.getItem("jwt"))}`
      }
    })
    .then(this._checkResponse);
  }

  getCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${JSON.parse(localStorage.getItem("jwt"))}`
      }
    })
    .then(this._checkResponse);
  }

  editProfileInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${JSON.parse(localStorage.getItem("jwt"))}`,
        'Content-Type': this._contentType
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
    .then(this._checkResponse);
  }

  editAvatar({ avatar }) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${JSON.parse(localStorage.getItem("jwt"))}`,
        'Content-Type': this._contentType
      },
      body: JSON.stringify({
        avatar: avatar
      })
    })
    .then(this._checkResponse);
  }

  addCardInApi({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${JSON.parse(localStorage.getItem("jwt"))}`,
        'Content-Type': this._contentType
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then(this._checkResponse);
  }

  deleteCardInApi(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${JSON.parse(localStorage.getItem("jwt"))}`,
        'Content-Type': this._contentType,
      }
    })
    .then(this._checkResponse);
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: {
          authorization: `Bearer ${JSON.parse(localStorage.getItem("jwt"))}`
        }
      })
      .then(this._checkResponse);
    } else {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: {
          authorization: `Bearer ${JSON.parse(localStorage.getItem("jwt"))}`
        }
      })
      .then(this._checkResponse);
    }
  }
}

const api = new Api({
  baseUrl: "http://localhost:3000",
  headers: {
    'Content-Type': 'application/json',
  }
});

export default api;