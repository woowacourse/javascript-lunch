import Input from '../components/composables/Input';
import { InputElementDataType } from '../types/components';

const generateInputComponent = (inputOptionData: InputElementDataType) => {
  const { TAG_CLASS_NAME, TAG_ID, TAG_TYPE, TAG_REQUIRED } = inputOptionData;

  return Input({
    className: TAG_CLASS_NAME ?? '',
    id: TAG_ID,
    type: TAG_TYPE,
    required: TAG_REQUIRED,
  });
};

export default generateInputComponent;
