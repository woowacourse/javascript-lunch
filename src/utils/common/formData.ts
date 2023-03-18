export interface FormFields {
  [k: string]: FormDataEntryValue;
}

export const isFormElement = (target: unknown): target is HTMLFormElement =>
  target instanceof HTMLFormElement;

export function getFormFields(form: HTMLFormElement): FormFields {
  const formaData = new FormData(form);

  return Object.fromEntries(formaData);
}
