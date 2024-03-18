import { UlTagElementDataType } from '../types/components';
import UlTag from '../components/composables/UlTag';

const generateUlTagComponent = (UlOptionData: UlTagElementDataType) => {
  const { TAG_CLASS_NAME } = UlOptionData;

  return UlTag({
    className: TAG_CLASS_NAME,
  });
};

export default generateUlTagComponent;
