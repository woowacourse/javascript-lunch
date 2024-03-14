import Form from '../components/composables/Form';
import { FormElementDataType } from '../types/components';

const generateFormComponent = (formOptionData: FormElementDataType) => {
  const { TAG_ID, TAG_CLASS_NAME } = formOptionData;

  return Form({
    id: TAG_ID,
    className: TAG_CLASS_NAME,
  });
};

export default generateFormComponent;
