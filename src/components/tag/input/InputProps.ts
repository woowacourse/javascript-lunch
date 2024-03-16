interface InputProps {
  type: string;
  name: string;
  id: string;
  required: boolean;
  pattern?: RegExp;
}

export default InputProps;
