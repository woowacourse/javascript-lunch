import { PComponentPropsType } from '../../types/components';

function P({ className, textContent }: PComponentPropsType) {
  const p = Object.assign(document.createElement('p'), {
    className,
    textContent,
  });

  return p;
}

export default P;
