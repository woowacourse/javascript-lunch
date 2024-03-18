import { HeaderElementDataType } from '../types/components';
import Header from '../components/composables/Header';

const generateHeaderComponent = (headerOptionData: HeaderElementDataType) => {
  const { TAG_CLASS_NAME } = headerOptionData;

  return Header({
    className: TAG_CLASS_NAME ?? '',
  });
};

export default generateHeaderComponent;
