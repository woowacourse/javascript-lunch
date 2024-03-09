import Label from '../components/composables/Label';
import { LabelElementDataType } from '../types';

const generateLabelComponent = (labelOptionData: LabelElementDataType) => {
  const { TAG_HTML_FOR, TAG_TEXT } = labelOptionData;

  return Label({
    htmlFor: TAG_HTML_FOR,
    text: TAG_TEXT,
  });
};

export default generateLabelComponent;
