import { TextAreaComponentPropsType } from '../../types/components';

function TextArea({ name, id, rows, cols, className }: Partial<TextAreaComponentPropsType>) {
  const textArea = Object.assign(document.createElement('textarea'), {
    name,
    id,
    rows,
    cols,
    className,
  });

  return textArea;
}

export default TextArea;
