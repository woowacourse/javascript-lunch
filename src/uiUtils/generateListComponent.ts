import List from '../components/composables/List';
import { ListElementDataType } from '../types/components';

const generateListComponent = (listOptionData: Partial<ListElementDataType>) => {
  const { TAG_CLASS_NAME, TAG_TEXT_CONTENT } = listOptionData;

  return List({
    className: TAG_CLASS_NAME ?? '',
    textContent: TAG_TEXT_CONTENT ?? '',
  });
};

export default generateListComponent;
