interface IDomAttributes {
  name?: string;
  id?: string;
  class?: string[];
  required?: boolean;
  type?: 'submit' | 'reset' | 'button';
  text?: string;
}

interface ISelectOption {
  value: string;
  text: string;
}

export type { IDomAttributes, ISelectOption };
