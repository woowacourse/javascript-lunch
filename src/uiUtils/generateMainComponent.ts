import { MainElementDataType } from '../types/components.d';
import Main from '../components/composables/Main';

const generateMainComponent = (mainOptionData: MainElementDataType) => {
  const { TAG_CLASS_NAME } = mainOptionData;

  return Main({
    className: TAG_CLASS_NAME ?? '',
  });
};

export default generateMainComponent;
