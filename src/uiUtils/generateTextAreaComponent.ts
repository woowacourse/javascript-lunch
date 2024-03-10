import TextArea from '../components/composables/TextArea';
import { TextAreaElementDataType } from '../types/components';

const generateTextAreaComponent = (textAreaOptionData: TextAreaElementDataType) => {
  const { TAG_ID, TAG_NAME, TAG_ROWS, TAG_COLS } = textAreaOptionData;

  return TextArea({
    id: TAG_ID,
    name: TAG_NAME,
    rows: TAG_ROWS,
    cols: TAG_COLS,
  });
};

export default generateTextAreaComponent;
