export type DropBoxName =
  | 'filteringSort'
  | 'filteringCategory'
  | 'category'
  | 'distance';

export interface SelectProps {
  name?: string;
  id: string;
  class?: string;
  require: boolean;
}

export interface OptionProps {
  value: string;
  text: string;
  hidden?: boolean;
}
