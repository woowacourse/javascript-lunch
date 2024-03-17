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
