interface IDomAttributes {
  name?: string;
  id?: string;
  class?: string[];
  text?: string;
}

interface ISelectAttributes extends IDomAttributes {
  required?: boolean;
}

interface IButtonAttributes extends IDomAttributes {
  type?: 'submit' | 'reset' | 'button';
}

interface ISelectOption {
  value: string;
  text: string;
}

export type { IDomAttributes, ISelectAttributes, IButtonAttributes, ISelectOption };
