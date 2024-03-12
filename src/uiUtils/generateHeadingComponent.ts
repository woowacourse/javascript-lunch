import Heading from '../components/composables/Heading';
import { HeadingElementDataType } from '../types/components';

const generateHeadingComponent = (headingOptionData: HeadingElementDataType) => {
  const { TAG_CLASS_NAME, TAG_LEVEL, TAG_TEXT_CONTENT } = headingOptionData;

  return Heading({
    className: TAG_CLASS_NAME,
    level: TAG_LEVEL,
    textContent: TAG_TEXT_CONTENT,
  });
};

export default generateHeadingComponent;
