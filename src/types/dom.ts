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

interface IDomCreation extends IDomAttributes {
  tagName: string;
}

interface IOptionAttributes {
  value: string;
  text: string;
}

export type { IDomAttributes, ISelectAttributes, IButtonAttributes, IDomCreation, IOptionAttributes };
