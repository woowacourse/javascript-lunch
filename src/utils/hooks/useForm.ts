import { getFormFields } from '../common/formData';
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

  const resetErrors = () => setFormState({ errors: {} });
  const reset = () => {
    conditions = {};
    setFormState({ errors: {} });
  };

  const register = (name: string, validator: Validator) => {
    if (!conditions[name]) {
      conditions[name] = {
        value: '',
        validator,
      };
    }

    return conditions[name].value;
  };

  const handleSubmit = (onSubmit: EventCallback): EventCallback => {
    return (e) => {
      if (e.target instanceof HTMLFormElement) {
        e.preventDefault();
        const errors: Errors = {};
        const fields = getFormFields(e.target);

        Object.entries(conditions).forEach(([name, { validator }]) => {
          conditions[name].value = fields[name];

          return validate({
            data: fields[name],
            validator,
            onError(error) {
              errors[name] = error.message;
            },
          });
        });

        if (Object.keys(errors).length === 0) {
          onSubmit(e);
        } else setFormState({ ...formState, errors });
      }
    };
  };

  const validate = ({ data, validator, onError }: Validate) => {
    try {
      validator(data);
      return true;
    } catch (error) {
      handleError(error, { onError });

      return false;
    }
  };

  return { formState, register, handleSubmit, resetErrors, reset };
}

export { useForm };
