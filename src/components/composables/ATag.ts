import { ATagComponentPropsType } from '../../types/components';

function ATag({ className, href, _blank }: ATagComponentPropsType) {
  const aTag = Object.assign(document.createElement('a'), {
    className,
    _blank,
    href,
  });

  return aTag;
}

export default ATag;
