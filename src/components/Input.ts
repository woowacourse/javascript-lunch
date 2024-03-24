type InputProps = {
  type: 'text' | 'url';
  name?: string;
  id?: string;
  required?: boolean;
  className?: string;
};

const Input = ({ type, name, id, required, className }: InputProps) => {
  const input = document.createElement('input');
  input.type = type;

  if (name) {
    input.name = name;
  }

  if (id) {
    input.id = id;
  }

  if (required) {
    input.required = true;
  }

  if (className) {
    input.className = className;
  }

  input.placeholder = type === 'text' ? '(15자 이하)' : 'ex ) https://www.example.com';

  const create = () => input;

  return {
    create
  };
};

export default Input;
