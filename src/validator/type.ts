export interface Validator {
  validationTypes: any;
  check: (...args: any[]) => void;
}

export type ValidationType<T> = {
  errorMessage: string;
  isValid: (...inputValues: [T, ...any]) => boolean;
};

export type ValidationTypes<T extends Validator> = T["validationTypes"];

export type ErrorMessages<T extends Validator> = {
  [K in keyof ValidationTypes<T>]: ValidationTypes<T>[K]["errorMessage"];
};
