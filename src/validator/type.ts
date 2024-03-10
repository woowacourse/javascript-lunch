export interface ValidationType<T> {
  errorMessage: string;
  isValid: (...inputValues: [T, ...any]) => boolean;
}
