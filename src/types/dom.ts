interface IDomAttributes {
  id?: string;
  classNames?: string[];
  text?: string;
}

interface ISelectAttributes extends IDomAttributes {
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

export type { IDomAttributes, ISelectAttributes, IButtonAttributes, IImageAttributes, IOptionAttributes, IDomCreation };
