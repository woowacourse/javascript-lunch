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
  ariaLabel?: string;
}

interface IImageAttributes extends IDomAttributes {
  src: string;
  alt?: string;
}

interface IOptionAttributes {
  value: string;
  text: string;
}

interface IDomCreation extends IDomAttributes {
  tagName: string;
  children?: HTMLElement[];
}

interface IFormInput {
  category: HTMLInputElement;
  name: HTMLInputElement;
  distance: HTMLInputElement;
  link: HTMLInputElement;
  $addButton: HTMLButtonElement;
}

interface FormElements extends HTMLFormControlsCollection, Omit<IFormInput, '$addButton'> {
  description: HTMLInputElement;
}

export type {
  IDomAttributes,
  IDropdownAttributes,
  IButtonAttributes,
  IImageAttributes,
  IOptionAttributes,
  IDomCreation,
  IFormInput,
  FormElements,
};
