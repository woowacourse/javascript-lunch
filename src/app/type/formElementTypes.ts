export type FormItemContainerElementType = {
  required: boolean;
};

export type LabelElementType = {
  targetId: string;
  labelText: string;
};

export type CaptionElementType = {
  captionText: string;
};

export type InputElementType = {
  type: 'text' | 'number' | 'url';
  name: string;
  required: boolean;
};

export type TextAreaElementType = {
  name: string;
  cols: number;
  rows: number;
  required: boolean;
};

export type SelectBoxElementType = {
  name: string;
  required: boolean;
};

export type OptionItemType = {
  type: object;
  defaultOption?: string;
};

export type ButtonElementType = {
  type: 'button' | 'submit';
  style: 'primary' | 'secondary';
  id: string;
  textContent: string;
};
