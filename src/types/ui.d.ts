export type Attribute = {
  type?: string;
  name?: string;
  id?: string;
  className?: string;
  required?: boolean;
  checked?: boolean;
  for?: string;
};

export type Option = {
  text: readonly string[];
  value: readonly string[];
};

export type ButtonContent = string;
