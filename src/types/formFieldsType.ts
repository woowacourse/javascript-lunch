export interface BaseField {
  label: string;
  eventType?: string;
  event?: () => void;
  attribute: {
    required?: boolean;
    id: string;
    name: string;
    type?: string;
    maxlength?: number;
    placeholder?: string;
  };
  helperText?: string;
}

export interface SelectField extends BaseField {
  options?: Record<string, string | number>;
}

export interface TextareaField extends BaseField {
  attribute: BaseField["attribute"] & {
    cols?: string;
    rows?: string;
  };
}

export type FormField = BaseField | SelectField | TextareaField;

export interface FieldGroup {
  fields: Record<string, FormField>;
  create: (info: FormField) => HTMLElement;
}

interface FieldSelectGroup {
  fields: Record<string, FormField>;
  create: (info: FormField) => HTMLSelectElement;
}

export interface FormFields {
  INPUTS: FieldGroup;
  SELECTS: FieldSelectGroup;
  TEXTAREAS: FieldGroup;
}
