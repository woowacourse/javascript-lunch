export interface FormField {
  label: string;
  type: "select" | "input" | "textarea";
  name: string;
  required?: boolean;
  notice?: string;
  inputType?: "text" | "url";
  options?: string[];
  defaultOption?: string;
}

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
