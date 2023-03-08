export interface FormFields {
  [k: string]: FormDataEntryValue;
}

export function getFormFields(form: HTMLFormElement): FormFields {
  const formaData = new FormData(form);

  return Object.fromEntries(formaData);
}
