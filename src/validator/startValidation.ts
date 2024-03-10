import { ValidationType } from "./type";

export const startValidation = <T extends Record<string, ValidationType<V>>, V>(
  validationTypes: T,
  value: V
) => {
  Object.values(validationTypes).forEach(({ errorMessage, isValid }) => {
    if (!isValid(value)) throw new Error(errorMessage);
  });
};
