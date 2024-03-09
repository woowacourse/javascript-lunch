type Option = {
  text: string;
  value: string;
};

export type SelectPropsType = {
  options: Option[];
  className?: string;
  id?: string;
  name: string;
  defaultValue?: string;
};

type BasicElementDataType = {
  TAG_CLASS_NAME: string;
};

export interface SelectElementDataType extends BasicElementDataType {
  UI_OPTIONS: Option[];
  TAG_ID: string;
  TAG_NAME: string;
}

export type SelectElementPropsType = {
  [K in keyof SelectProps]?: SelectProps[K];
};

export type OptionElementPropsType = {
  select: HTMLSelectElement;
  options: Option[];
  defaultValue?: string;
};

export type ButtonProps = {
  type?: 'button' | 'submit' | 'reset';
  className: string;
  text: string;
};

export interface ButtonElementDataType extends BasicElementDataType {
  TAG_TEXT: string;
  TAG_TYPE?: 'submit' | 'button' | 'reset';
}

export type LabelComponentPropsType = {
  htmlFor: string;
  text: string;
  className?: string;
};

export interface LabelElementDataType extends Partial<BasicElementDataType> {
  TAG_HTML_FOR: string;
  TAG_TEXT: string;
}
