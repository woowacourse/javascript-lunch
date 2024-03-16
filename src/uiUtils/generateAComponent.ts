import { ATagElementDataType } from '../types/components';
import A from '../components/composables/A';

const generateAComponenet = (ATagOptionData: ATagElementDataType) => {
  const { TAG_CLASS_NAME, TAG_HREF, TAG_BLANK, TAG_TEXT_CONTENT } = ATagOptionData;

  return A({
    className: TAG_CLASS_NAME ?? '',
    href: TAG_HREF ?? '',
    _blank: TAG_BLANK ?? false,
    textContent: TAG_TEXT_CONTENT ?? '',
  });
};

export default generateAComponenet;
