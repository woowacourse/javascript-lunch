import { ATagComponentPropsType } from '../../types/components';

function A({ className, href, _blank, textContent }: ATagComponentPropsType) {
  const aTag = Object.assign(document.createElement('a'), {
    className,
    _blank,
    href,
    textContent,
  });

  return aTag;
}

export default A;
