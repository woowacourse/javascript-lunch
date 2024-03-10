export type DropBoxName =
  | 'filteringSorting'
  | 'filteringCategory'
  | 'category'
  | 'distance';

export interface SelectProps {
  name?: string;
  id: string;
  class?: string;
  required: boolean;
}

export interface OptionProps {
  value: string;
  text: string;
  hidden?: boolean;
}

export type DropBoxMapValue = {
  selectProps: SelectProps;
  labelText: string;
  options: OptionProps[];
};
