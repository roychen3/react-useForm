import React, { useEffect } from 'react';

import {
  requiredValidate,
  requiredArrayValidate,
  numberValidate,
  minValidate,
  maxValidate,
  emailValidate,
  dateStartBeforeEndValidate,
} from './utils/formValidate';
import { useForm } from './hook/useForm';

import {
  FormField,
  InputField,
  CheckBoxField,
  RadioField,
} from './component/form';
import './App.css';

const App = () => {
  const { formValues, formErrors, setFieldValue, handleChange, handleSubmit } =
    useForm({
      initialValues: {
        email: '',
        name: '',
        height: 0,
        weight: '',
        bmi: '',
        categoryIds: [],
        smoke: '',
        startDate: '',
        endDate: '',
        memo: '',
      },
      validation: {
        email: (value) => emailValidate(value),
        name: (value) =>
          requiredValidate(value) ||
          minValidate(value, 2) ||
          maxValidate(value, 16),
        height: (value) => minValidate(value, 1) || maxValidate(value, 300),
        weight: (value) => requiredValidate(value) || numberValidate(value),
        categoryIds: (value) => {
          const requiredArrayError = requiredArrayValidate(value);
          const maxError = value.length > 3 ? '最多選三項' : '';
          return requiredArrayError || maxError;
        },
        smoke: (value) => requiredValidate(value),
        startDate: (value) =>
          requiredValidate(value) ||
          dateStartBeforeEndValidate(value, formValues.endDate),
        endDate: (value) =>
          requiredValidate(value) ||
          dateStartBeforeEndValidate(formValues.startDate, value),
      },
      onSubmit: (values) => {
        console.log('submit values', values);
      },
    });

  useEffect(() => {
    if (formValues.weight && formValues.height) {
      const value =
        parseFloat(formValues.weight) / ((formValues.height / 100) ^ 2);
      setFieldValue({
        name: 'bmi',
        value,
      });
    }
  }, [formValues.weight, formValues.height]);

  return (
    <div>
      <h1>useForm</h1>
      <form onSubmit={handleSubmit}>
        <InputField
          label='email'
          type='text'
          name='email'
          value={formValues.email}
          error={formErrors.email}
          onChange={handleChange}
        />
        <InputField
          label='name'
          type='text'
          name='name'
          value={formValues.name}
          error={formErrors.name}
          onChange={handleChange}
        />
        <InputField
          label='height (cm)'
          type='number'
          name='height'
          value={formValues.height}
          error={formErrors.height}
          onChange={handleChange}
        />
        <InputField
          label='weight (kg)'
          type='text'
          name='weight'
          value={formValues.weight}
          error={formErrors.weight}
          onChange={handleChange}
        />
        <InputField
          label='BMI'
          type='text'
          name='bmi'
          value={formValues.bmi}
          error={formErrors.bmi}
          readOnly
          onChange={handleChange}
        />

        <CheckBoxField
          label='category'
          name='categoryIds'
          options={[
            {
              label: 'option 1',
              value: 'a',
            },
            {
              label: 'option 2',
              value: 'b',
            },
            {
              label: 'option 3',
              value: 'c',
            },
            {
              label: 'option 4',
              value: 'd',
            },
            {
              label: 'option 5',
              value: 'e',
            },
          ]}
          value={formValues.categoryIds}
          error={formErrors.categoryIds}
          onChange={handleChange}
        />

        <RadioField
          label='smoke'
          name='smoke'
          options={[
            {
              label: 'yes',
              value: 'y',
            },
            {
              label: 'no',
              value: 'n',
            },
          ]}
          value={formValues.smoke}
          error={formErrors.smoke}
          onChange={handleChange}
        />

        <FormField
          label='date'
          error={formErrors.startDate || formErrors.endDate}
        >
          <input
            type='date'
            name='startDate'
            value={formValues.startDate}
            onChange={handleChange}
          />
          <strong>{` - `}</strong>
          <input
            type='date'
            name='endDate'
            value={formValues.endDate}
            onChange={handleChange}
          />
        </FormField>

        <InputField
          label='memo'
          type='text'
          name='memo'
          value={formValues.memo}
          error={formErrors.memo}
          onChange={handleChange}
        />

        <div className='form-btn-container'>
          <button type='submit' className='btn'>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

App.propTypes = {};

export default App;
