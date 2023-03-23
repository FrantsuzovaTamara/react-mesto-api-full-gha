import {useState} from "react";
import FormValidator from '../utils/FormValidator';

export function FormForAuth({
  name,
  title,
  children, 
  submit,
  onSubmit
}) {
  const [formValues, setFormValues] = useState([]);

  const {
    errors,
    isValid,
    handleChange
  } = FormValidator({});

  const handleChangeValue = (e) => {
    const {name, value} = e.target;
    handleChange(e, ".auth__form");

    setFormValues({
      ...formValues,
      [name]: value
    });
  }

  function submitForm(e) {
    e.preventDefault();
    onSubmit(formValues);
  }

  return (
    <div className="auth">
      <form className="auth__form" name={name} onSubmit={submitForm} noValidate>
        <h3 className="auth__title">{title}</h3>
        <label className="auth__field">
          <input
            id="email"
            type="email"
            name="email"
            className={`auth__input ${errors.email ? "auth__input_type_error" : ""}`}
            placeholder="E-mail"
            value={formValues.email || ""}
            onChange={handleChangeValue}
            required
          />
          <span
            className={
              errors.email
                ? "auth__input-error auth__input-error_active"
                : "auth__input-error"
            }
          >
            {errors.email}
          </span>
        </label>
        <label className="auth__field">
          <input
            id="password"
            type="password"
            name="password"
            minLength="6"
            maxLength="30"
            className={`auth__input ${errors.password ? "auth__input_type_error" : ""}`}
            placeholder="Пароль"
            value={formValues.password || ""}
            onChange={handleChangeValue}
            required
          />
          <span
            className={
              errors.password
                ? "auth__input-error auth__input-error_active"
                : "auth__input-error"
            }
          >
            {errors.password}
          </span>
        </label>
        <button
          type="submit"
          className={`auth__submit-button ${isValid ? "" : "auth__submit-button_inactive"}`}
          disabled={!isValid}
        >
          {submit}
        </button>
      </form>
      {children}
    </div>
  );
}
