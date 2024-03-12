import P from '../components/composables/P';
import { PElementDataType } from '../types/components';

const generatePComponent = (pOptionData: PElementDataType) => {
  const { TAG_CLASS_NAME, TAG_TEXT_CONTENT } = pOptionData;

  return P({
    className: TAG_CLASS_NAME ?? '',
    textContent: TAG_TEXT_CONTENT,
  });
};

export default generatePComponent;
