export interface InputType {
  isRequired: boolean;
  name: string;
  label: string;
  caption: string;
}

export interface SelectInputType {
  isRequired: boolean;
  name: string;
  label: string;
  optionList: OptionType[];
}

interface OptionType {
  value: string;
  label: string;
}

export interface TextareaInputType {
  isRequired: boolean;
  label: string;
  caption: string;
  name: string;
}
