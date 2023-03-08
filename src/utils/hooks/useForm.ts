import { FormFields, getFormFields } from '../common/formData';
import { EventCallback, useState } from '../core';
import { handleError } from '../../validation';

interface Validator {
  (value: FormDataEntryValue): boolean;
}

interface Conditions {
  [name: string]: Validator;
}

interface FormState {
  errors: {};
}

interface Validate {
  data: FormDataEntryValue;
  validator: Validator;
  onSuccess?(): void;
  onError?(error: Error): void;
}

const conditions: Conditions = {};

function useForm() {
  const [formState, setFormState] = useState<FormState>({ errors: {} });

  const register = (name: string, validator: Validator) => {
    !conditions[name] && (conditions[name] = validator);

    return ``;
  };

  const resetErrors = () => setFormState({ ...formState, errors: {} });

  const handleSubmit = (onSubmit: EventCallback): EventCallback => {
    return (e) => {
      if (e.target instanceof HTMLFormElement) {
        e.preventDefault();
        const fields = getFormFields(e.target);

        Object.entries(conditions).forEach(([name, validator]) => {
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

  return { formState, register, handleSubmit, resetErrors };
}

export { useForm };
