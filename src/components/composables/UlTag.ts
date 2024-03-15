import { UlTagComponentPropsType } from '../../types/components';

function UlTag({ className }: UlTagComponentPropsType) {
  const ul = Object.assign(document.createElement('ul'), {
    className,
  });

  return ul;
}

export default UlTag;
