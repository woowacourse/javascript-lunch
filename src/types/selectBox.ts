interface IDomAttributes {
  name?: string;
  id?: string;
  class?: string;
  required?: boolean;
}

interface ISelectOption {
  value: string;
  text: string;
}

export type { IDomAttributes, ISelectOption };
