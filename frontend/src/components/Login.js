import React from "react";
import { FormForAuth } from "./FormForAuth";

export function Login({handleLogin}) {

  function handleSubmit(formValue) {
    handleLogin({email: formValue.email, password: formValue.password});
  }

  return (
    <FormForAuth name="login" title="Вход" submit="Войти" onSubmit={handleSubmit} />
  );
}
