import { ListComponentPropsType } from '../../types/components';

function List({ textContent, className }: ListComponentPropsType) {
  const list = Object.assign(document.createElement('li'), {
    textContent,
    className,
  });

  return list;
}

export default List;
