import { SectionElementDataType } from '../types/components.d';
import Section from '../components/composables/Section';

const generateSectionComponent = (sectionOptionData: SectionElementDataType) => {
  const { TAG_CLASS_NAME } = sectionOptionData;

  return Section({
    className: TAG_CLASS_NAME ?? '',
  });
};

export default generateSectionComponent;
