import Button from '../components/composables/Button';
import { ButtonElementDataType } from '../types/components';

const generateButtonComponent = (buttonOptionData: ButtonElementDataType) => {
  const { TAG_TEXT, TAG_TYPE, TAG_CLASS_NAME } = buttonOptionData;

  return Button({
    className: TAG_CLASS_NAME,
    text: TAG_TEXT,
    type: TAG_TYPE,
  });
};

export default generateButtonComponent;
