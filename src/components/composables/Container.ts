import { ContainerComponentPropsType } from '../../types/components';

function Container({ id, className }: ContainerComponentPropsType) {
  const container = Object.assign(document.createElement('div'), {
    id,
    className,
  });
  return container;
}

export default Container;
