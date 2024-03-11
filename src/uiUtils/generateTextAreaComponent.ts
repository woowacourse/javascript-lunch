import TextArea from '../components/composables/TextArea';
import { TextAreaElementDataType } from '../types/components';

const generateTextAreaComponent = (textAreaOptionData: Partial<TextAreaElementDataType>) => {
  const { TAG_ID, TAG_NAME, TAG_ROWS, TAG_COLS, TAG_CLASS_NAME } = textAreaOptionData;

  return TextArea({
    id: TAG_ID ?? '',
    name: TAG_NAME ?? '',
    rows: TAG_ROWS ?? 0,
    cols: TAG_COLS ?? 0,
    className: TAG_CLASS_NAME ?? '',
  });
};

export default generateTextAreaComponent;
