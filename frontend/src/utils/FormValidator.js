import { useCallback, useState } from "react";

function FormValidator() {
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);
  
    function handleChange(event, formClass) {
      const target = event.target;
      const name = target.name;
      setErrors({...errors, [name]: target.validationMessage });
      setIsValid(target.closest(formClass).checkValidity());
    };
  
    const resetForm = useCallback(
      (newErrors = {}, newIsValid = false) => {
        setErrors(newErrors);
        setIsValid(newIsValid);
      },
      [setErrors, setIsValid]
    );
  
    return { handleChange, errors, isValid, resetForm };
  }

export default FormValidator;