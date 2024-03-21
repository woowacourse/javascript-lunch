import OptionProps from '../option/OptionProps';

type SelectProps = {
  name: string;
  id: string;
  classname?: string;
  required: boolean;
  options: OptionProps[];
  onChange?: () => void;
};

export default SelectProps;
