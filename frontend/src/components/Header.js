import { useState } from "react";
import { NavLink } from "react-router-dom";

function Header({ loggedIn, email, signOut }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function openMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <>
      <div className={`menu ${isMenuOpen ? "menu_opened" : ""}`}>
        {!loggedIn ? (
          <>
            <NavLink
              to="/react-mesto-auth/sign-up"
              className={({ isActive }) =>
                `header__link ${isActive ? "header__link_inactive" : ""}`
              }
            >
              Регистрация
            </NavLink>
            <NavLink
              to="/react-mesto-auth/sign-in"
              className={({ isActive }) =>
                `header__link ${isActive ? "header__link_inactive" : ""}`
              }
            >
              Войти
            </NavLink>
          </>
        ) : (
          <>
            <p href="#" className="header__link header__link_email">
              {email}
            </p>
            <button
              className="header__link header__link_exit"
              onClick={signOut}
            >
              Выйти
            </button>
          </>
        )}
      </div>
      <header className="header">
        <a className="header__logo" href="#"></a>
        <nav className="header__entrance">
          {!loggedIn ? (
            <>
              <NavLink
                to="/react-mesto-auth/sign-up"
                className={({ isActive }) =>
                  `header__link ${isActive ? "header__link_inactive" : ""}`
                }
              >
                Регистрация
              </NavLink>
              <NavLink
                to="/react-mesto-auth/sign-in"
                className={({ isActive }) =>
                  `header__link ${isActive ? "header__link_inactive" : ""}`
                }
              >
                Войти
              </NavLink>
            </>
          ) : (
            <>
              <p href="#" className="header__link header__link_email">
                {email}
              </p>
              <button
                className="header__link header__link_exit"
                onClick={signOut}
              >
                Выйти
              </button>
            </>
          )}
        </nav>
        <button
          className={`header__menu ${isMenuOpen ? "header__menu_opened" : ""}`}
          onClick={openMenu}
        ></button>
      </header>
    </>
  );
}

export default Header;
