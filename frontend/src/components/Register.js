import React from "react";
import { FormForAuth } from "./FormForAuth";
import { Link } from "react-router-dom";

export function Register({handleRegister}) {
  function handleSubmit(formValue) {
    handleRegister({password: formValue.password, email: formValue.email});
  }

  return (
    <FormForAuth name="register" title="Регистрация" submit="Зарегистрироваться" onSubmit={handleSubmit}>
      <Link to="/react-mesto-auth/sign-in" className="auth__link">
          Уже зарегистрированы? Войти
      </Link>
    </FormForAuth>
  );
}
