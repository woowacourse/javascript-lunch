import Container from '../components/composables/Container';
import { ContainerElementDataType } from '../types/components';

const generateContainerComponent = (containerOptionData: ContainerElementDataType) => {
  const { TAG_CLASS_NAME, TAG_ID } = containerOptionData;

  return Container({
    className: TAG_CLASS_NAME ?? '',
    id: TAG_ID ?? '',
  });
};

export default generateContainerComponent;
