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

export type ButtonComponentProps = {
  type: 'button' | 'submit' | 'reset';
  className: string;
  text: string;
  id: string;
  value: string;
  role: string;
  ariaLabel: string;
};

export interface ButtonElementDataType extends BasicElementDataType {
  TAG_TEXT: string;
  TAG_TYPE: 'submit' | 'button' | 'reset';
  TAG_ID: string;
  TAG_VALUE: string;
  TAG_ROLE: string;
  TAG_ARIA_LABEL: string;
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
  TAG_TEXT_CONTENT: string;
}

export type TextAreaComponentPropsType = {
  name: string;
  id: string;
  cols: number;
  rows: number;
  className: string;
};

export interface TextAreaElementDataType extends Partial<BasicElementDataType> {
  TAG_ID: string;
  TAG_NAME: string;
  TAG_ROWS: number;
  TAG_COLS: number;
}

export type ContainerComponentPropsType = {
  id: string;
  className: string;
};

export interface ContainerElementDataType extends Partial<BasicElementDataType> {
  TAG_ID?: string;
}

export type ListComponentPropsType = {
  className: string;
  textContent: string;
};

export interface ListElementDataType extends Partial<BasicElementDataType> {
  TAG_TEXT_CONTENT: string;
}

export type ImageComponentPropsType = {
  src: string;
  alt: string;
  className: string;
};

export interface ImageElementDataType extends BasicElementDataType {
  TAG_SRC: string;
  TAG_ALT: string;
}

export type HeadingComponentPropsType = {
  level: number;
  textContent: string;
  className: string;
};

export interface HeadingElementDataType extends BasicElementDataType {
  TAG_LEVEL: number;
  TAG_TEXT_CONTENT: string;
  TAG_CLASS_NAME: string;
}

export type PComponentPropsType = {
  className: string;
  textContent: string;
};

export interface PElementDataType extends BasicElementDataType {
  TAG_TEXT_CONTENT: string;
}

export type HeaderComponentPropsType = {
  className: string;
};

export interface HeaderElementDataType extends BasicElementDataType {}

export type FormComponentPropsType = {
  id: string;
  className: string;
};

export interface FormElementDataType extends BasicElementDataType {
  TAG_ID: string;
}

export type ATagComponentPropsType = {
  href: string;
  _blank: boolean;
  className: string;
  textContent: string;
};

export interface ATagElementDataType extends BasicElementDataType {
  TAG_HREF: string;
  TAG_BLANK: boolean;
  TAG_TEXT_CONTENT: string;
}

export type SectionComponentPropsType = {
  className: string;
};

export interface SectionElementDataType extends BasicElementDataType {}

export type MainComponentPropsType = {
  className: string;
};

export interface MainElementDataType extends BasicElementDataType {}

export type UlTagComponentPropsType = {
  className: string;
};

export interface UlTagElementDataType extends BasicElementDataType {}
