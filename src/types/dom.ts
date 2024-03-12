interface IDomAttributes {
  id?: string;
  classNames?: string[];
  text?: string;
}

interface IDropdownAttributes extends IDomAttributes {
  name?: string;
  required?: boolean;
}

interface IButtonAttributes extends IDomAttributes {
  name?: string;
  type?: 'submit' | 'reset' | 'button';
}

interface IImageAttributes extends IDomAttributes {
  src: string;
  alt: string;
}

interface IOptionAttributes {
  value: string;
  text: string;
}

interface IDomCreation extends IDomAttributes {
  tagName: string;
  children?: HTMLElement[];
}

interface FormElements extends HTMLFormControlsCollection {
  category: HTMLInputElement;
  name: HTMLInputElement;
  distance: HTMLInputElement;
  description: HTMLInputElement;
  link: HTMLInputElement;
}

interface IFormInput {
  category: HTMLInputElement;
  name: HTMLInputElement;
  distance: HTMLInputElement;
  link: HTMLInputElement;
  $addButton: HTMLButtonElement;
}

export type {
  IDomAttributes,
  IDropdownAttributes,
  IButtonAttributes,
  IImageAttributes,
  IOptionAttributes,
  IDomCreation,
  FormElements,
  IFormInput,
};
