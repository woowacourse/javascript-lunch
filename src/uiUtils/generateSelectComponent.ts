import Select from '../components/composables/Select';
import { SelectElementDataType } from '../types';

const generateSelectComponent = (selectOptionData: SelectElementDataType) => {
  const { TAG_ID, TAG_NAME, TAG_CLASS_NAME, UI_OPTIONS } = selectOptionData;

  return Select({
    id: TAG_ID,
    name: TAG_NAME,
    className: TAG_CLASS_NAME,
    options: UI_OPTIONS,
  });
};

export default generateSelectComponent;
