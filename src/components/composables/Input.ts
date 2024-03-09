import { InputComponentPropsType } from '../../types/components';

function Input({ id, type, className, required = false }: InputComponentPropsType) {
  const input = document.createElement('input');

  input.id = id;
  input.type = type;
  input.className = className!;
  input.required = required;

  return input;
}

export default Input;
