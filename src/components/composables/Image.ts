import { ImageComponentPropsType } from '../../types/components';

function Image({ src, alt, className }: ImageComponentPropsType) {
  const image = Object.assign(document.createElement('img'), {
    src,
    className,
    alt,
  });

  return image;
}
export default Image;
