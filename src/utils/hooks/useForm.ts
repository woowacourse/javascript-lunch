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
  conditions: Conditions;
  errors: Errors;
}

interface Validate {
  data: FormDataEntryValue;
  validator: Validator;
  onSuccess?<T>(data?: T): void;
  onError?(error: CustomError): void;
}

function useForm() {
  const [formState, setFormState] = useState<FormState>({ conditions: {}, errors: {} });

  const reset = () => setFormState({ conditions: {}, errors: {} });
  const resetErrors = () => setFormState({ ...formState, errors: {} });

  const register = (name: string, validator: Validator) => {
    if (!formState.conditions[name]) {
      formState.conditions[name] = {
        value: '',
        validator,
      };
    }

    return formState.conditions[name].value;
  };

  const handleSubmit = (onSubmit: EventCallback): EventCallback => {
    return (e) => {
      if (e.target instanceof HTMLFormElement) {
        e.preventDefault();
        const fields = getFormFields(e.target);

        Object.entries(formState.conditions).forEach(([name, { validator }]) => {
          formState.conditions[name].value = fields[name];

          validate({
            data: fields[name],
            validator,
            onSuccess() {
              onSubmit(e);
            },
            onError(error) {
              setFormState({ ...formState, errors: { [name]: error.message } });
            },
          });
        });
      }
    };
  };

  const validate = ({ data, validator, onSuccess, onError }: Validate) => {
    try {
      validator(data);
      onSuccess?.();
      resetErrors();
    } catch (error) {
      handleError(error, { onError });
    }
  };

  return { formState, register, handleSubmit, resetErrors, reset };
}

export { useForm };
