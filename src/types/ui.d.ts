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
  text: string[];
  value: string[];
};

export type ButtonContent = string;
