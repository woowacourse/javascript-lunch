// type TextareaProps = {
//   name: string;
//   id: string;
//   cols?: number;
//   rows?: number;
//   className?: string;
// };

// export default function TextareaComponent({
//   name,
//   id,
//   cols = 30,
//   rows = 5,
//   className
// }: TextareaProps) {
//   const getTemplate = () => {
//     const template = document.createElement('template');
//     template.innerHTML = `
//         <textarea
//           ${name ? `name="${name}"` : ''}
//           ${id ? `id="${id}"` : ''}
//           ${cols ? `cols="${cols}"` : ''}
//           ${rows ? `rows="${rows}"` : ''}
//           ${className ? `class="${className}"` : ''}
//         ></textarea>
//       `;
//     return template.content;
//   };

//   return { getTemplate };
// }

type TextareaProps = {
  name: string;
  id: string;
  cols?: number;
  rows?: number;
  className?: string;
};

const TextareaComponent = ({ name, id, cols = 30, rows = 5, className }: TextareaProps) => {
  const textarea = document.createElement('textarea');

  textarea.name = name;
  textarea.id = id;
  textarea.cols = cols;
  textarea.rows = rows;

  if (className) {
    textarea.className = className;
  }

  const create = () => textarea;

  return { create };
};

export default TextareaComponent;
