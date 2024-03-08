import OptionProps from './OptionProps';

type SelectProps = {
  name: string;
  id: string;
  classname?: string;
  required: boolean;
  options: OptionProps[];
};

export default SelectProps;
