import { TextAreaComponentPropsType } from '../../types/components';

function TextArea({ name, id, rows, cols, className }: Partial<TextAreaComponentPropsType>) {
  const textArea = document.createElement('textarea');

  if (name) textArea.name = name;
  if (id) textArea.id = id;
  if (rows) textArea.rows = rows;
  if (cols) textArea.cols = cols;
  if (className) textArea.className = className;

  return textArea;
}

export default TextArea;
