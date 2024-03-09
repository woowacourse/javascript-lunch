type Option = {
  text: string;
  value: string;
};

export type SelectComponentPropsType = {
  options: readonly Option[];
  className?: string;
  id?: string;
  name: string;
  defaultValue?: string;
  required?: boolean;
};

type BasicElementDataType = {
  TAG_CLASS_NAME: string;
};

export interface SelectElementDataType extends Partial<BasicElementDataType> {
  UI_OPTIONS: readonly Option[];
  TAG_ID: string;
  TAG_NAME: string;
  TAG_REQUIRED?: boolean;
}

export type OptionElementPropsType = {
  select: HTMLSelectElement;
  options: readonly Option[];
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

export type InputComponentPropsType = {
  type: string;
  id: string;
  className?: string;
  required?: boolean;
};

export interface InputElementDataType extends Partial<BasicElementDataType> {
  TAG_ID: string;
  TAG_REQUIRED?: boolean;
  TAG_TYPE: string;
}

export type SpanComponentPropsType = {
  className?: string;
  text: string;
};

export interface SpanElementDataType extends Partial<BasicElementDataType> {
  TAG_TEXT: string;
}
