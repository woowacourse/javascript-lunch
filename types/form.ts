export interface FormFieldOption {
  label: string;
  type: "select" | "input" | "textarea";
  name: string;
  required?: boolean;
  notice?: string;
}

export interface SelectFieldOption extends FormFieldOption {
  options: string[];
  defaultOption: string;
}

export interface InputFieldOption extends FormFieldOption {
  inputType: "text";
}

export type FormField = FormFieldOption | SelectFieldOption | InputFieldOption;

export interface ButtonOption {
  type: "button" | "submit";
  stylingBased: "primary" | "secondary";
  text: string;
}

export interface ModalFormConfig {
  fields: FormField[];
  buttons: ButtonOption[];
}

export interface ModalTitle {
  type: "modal";
  text: string;
}
