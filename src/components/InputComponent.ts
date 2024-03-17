type InputProps = {
  type: 'text' | 'url';
  name?: string;
  id?: string;
  required?: boolean;
  className?: string;
};

// export default function InputComponent({ type, name, id, required, className }: InputProps) {
//   const getTemplate = () => {
//     const template = document.createElement('template');
//     template.innerHTML = `
//         <input
//           type="${type}"
//           ${name ? `name="${name}"` : ''}
//           ${id ? `id="${id}"` : ''}
//           ${required ? 'required' : ''}
//           ${className ? `class="${className}"` : ''}
//           placeholder="${type === 'text' ? '(15자 이하)' : 'ex ) https://www.example.com'}"
//         >
//       `;
//     return template.content;
//   };

//   return { getTemplate };
// }

const InputComponent = ({ type, name, id, required, className }: InputProps) => {
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

export default InputComponent;
