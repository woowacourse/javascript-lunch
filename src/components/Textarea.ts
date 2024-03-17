type TextareaProps = {
  name: string;
  id: string;
  cols?: number;
  rows?: number;
  className?: string;
};

const Textarea = ({ name, id, cols = 30, rows = 5, className }: TextareaProps) => {
  const createTextarea = ({
    name,
    id,
    cols,
    rows,
    className
  }: TextareaProps): HTMLTextAreaElement => {
    const textarea = document.createElement('textarea');
    textarea.name = name;
    textarea.id = id;
    if (cols && rows) {
      textarea.cols = cols;
      textarea.rows = rows;
    }

    if (className) {
      textarea.className = className;
    }

    return textarea;
  };

  const textareaElement = createTextarea({ name, id, cols, rows, className });

  const create = (): HTMLTextAreaElement => textareaElement;

  return { create };
};

export default Textarea;
