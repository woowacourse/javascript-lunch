import Image from '../components/composables/Image';
import { ImageElementDataType } from '../types/components';

const generateImageComponent = (imageOptionData: ImageElementDataType) => {
  const { TAG_ALT, TAG_CLASS_NAME, TAG_SRC } = imageOptionData;

  return Image({
    className: TAG_CLASS_NAME ?? '',
    src: TAG_SRC,
    alt: TAG_ALT,
  });
};

export default generateImageComponent;
