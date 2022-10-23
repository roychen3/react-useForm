import React from 'react';

export const FormField = ({ label, error, children }) => (
  <label>
    <p className="label-text">{label}</p>
    {children}
    <p className="error">{error}</p>
  </label>
);

export const InputField = ({
  label,
  type,
  name,
  value,
  error,
  readOnly,
  onChange,
}) => (
  <FormField label={label} error={error}>
    <input
      type={type}
      name={name}
      value={value}
      readOnly={readOnly}
      onChange={onChange}
    />
  </FormField>
);
InputField.defaultProps = {
  readOnly: false,
};

export const CheckBoxField = ({
  label,
  name,
  options,
  value,
  error,
  onChange,
}) => (
  <FormField label={label} error={error}>
    {options.map((item) => (
      <label key={item.value} htmlFor={item.value}>
        <input
          type="checkbox"
          id={item.value}
          name={name}
          value={item.value}
          checked={value.includes(item.value)}
          onChange={onChange}
        />
        {item.label}
      </label>
    ))}
  </FormField>
);

export const RadioField = ({
  label,
  name,
  options,
  value,
  error,
  onChange,
}) => (
  <FormField label={label} error={error}>
    {options.map((item) => (
      <label key={item.value} htmlFor={item.value}>
        <input
          type="radio"
          id={item.value}
          name={name}
          value={item.value}
          checked={value === item.value}
          onChange={onChange}
        />
        {item.label}
      </label>
    ))}
  </FormField>
);
