import { useState } from 'react';

const copyKeyToEmpty = (obj) =>
  Object.keys(obj).reduce((prevObj, key) => ({ ...prevObj, [key]: '' }), {});

export const useForm = ({ initialValues, validation, onSubmit }) => {
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState(copyKeyToEmpty(initialValues));

  const validateValue = ({ name, value }) => {
    const error = validation[name] ? validation[name](value, formValues) : '';
    return error;
  };

  const validateAllValue = () => {
    const validateItem = ([name, value]) => ({
      [name]: validateValue({
        name,
        value,
      }),
    });

    const newFormErrors = Object.entries(formValues)
      .map(validateItem)
      .reduce((prevObj, item) => ({ ...prevObj, ...item }), {});
    return newFormErrors;
  };

  const validateFormValues = () => {
    const newFormErrors = validateAllValue();
    setFormErrors(newFormErrors);
  };

  const setFieldValue = ({ name, value }) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    setFormErrors((prevValues) => ({
      ...prevValues,
      [name]: validateValue({ name, value }),
    }));
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    let formatedValue = value;
    if (type === 'checkbox') {
      formatedValue = checked
        ? [...formValues[name], value]
        : formValues[name].filter((item) => item !== value);
    } else if (type === 'number') {
      formatedValue = value && !window.isNaN(value) ? parseFloat(value) : value;
    }

    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: formatedValue,
    }));
    setFormErrors((prevValues) => ({
      ...prevValues,
      [name]: validateValue({
        name: name,
        value: formatedValue,
      }),
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newFormErrors = validateAllValue();
    setFormErrors(newFormErrors);

    const filterNoneError = (item) => item[1];
    const filteredErrors =
      Object.entries(newFormErrors).filter(filterNoneError);

    if (filteredErrors.length === 0) {
      return onSubmit(formValues);
    }
  };

  return {
    formValues,
    formErrors,
    handleChange,
    handleSubmit,
    setFieldValue,
    validateFormValues,
  };
};
