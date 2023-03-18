import { FormFields } from './../common/formData';
import { getFormFields, isFormElement } from '../common/formData';
import { EventCallback, useState } from '../core';
import { handleError } from '../../validation';
import { CustomError } from '../../validation/error';

interface Validator {
  (value: FormDataEntryValue): boolean;
}

interface Conditions {
  [name: string]: {
    value: FormDataEntryValue;
    validator: Validator;
  };
}

interface Errors {
  [name: string]: string;
}

interface FormState {
  errors: Errors;
}

interface Validate {
  data: FormDataEntryValue;
  validator: Validator;
  onSuccess?<T>(data?: T): void;
  onError?(error: CustomError): void;
}

let conditions: Conditions = {};

function useForm() {
  const [formState, setFormState] = useState<FormState>({ errors: {} });

  const reset = () => {
    conditions = {};
    setFormState({ errors: {} });
  };

  const register = (name: string, validator: Validator) => {
    /** @description initialize conditions */
    if (!conditions[name]) {
      conditions[name] = { value: '', validator };
    }

    /** @description persist value */
    return String(conditions[name].value);
  };

  const handleSubmit = (onSubmit: EventCallback): EventCallback => {
    return (e) => {
      if (isFormElement(e.target)) {
        e.preventDefault();

        const fields = getFormFields(e.target);
        const errors = validateFields(fields);

        if (!Object.keys(errors).length) {
          return onSubmit(e);
        }

        /** @description update error info */
        setFormState({ ...formState, errors });
      }
    };
  };

  const validateFields = (fields: FormFields) => {
    /** @description save error info */
    const errors: Errors = {};

    Object.entries(conditions).forEach(([name, { validator }]) => {
      /** @description update value for persistence */
      conditions[name].value = fields[name];

      validateField({
        data: fields[name],
        validator,
        onError(error) {
          errors[name] = error.message;
        },
      });
    });

    return errors;
  };

  const validateField = ({ data, validator, onError }: Validate) => {
    try {
      validator(data);
    } catch (error) {
      handleError(error, { onError });
    }
  };

  return { formState, register, handleSubmit, reset };
}

export { useForm };
