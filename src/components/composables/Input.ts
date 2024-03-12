import { InputComponentPropsType } from '../../types/components';

function Input({ id, type, className, required = false }: InputComponentPropsType) {
  const input = Object.assign(document.createElement('input'), {
    id,
    type,
    className,
    required,
  });

  return input;
}

export default Input;
