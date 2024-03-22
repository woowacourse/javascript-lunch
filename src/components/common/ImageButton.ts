import type { IImageAttributes } from '@/types/dom';

import dom from '@/utils/dom';

interface Props {
  buttonId?: string;
  classNames?: string[];
  imageSrc: string;
  alt: string;
  onClick?: () => void;
}

const createImageButton = ({ buttonId, classNames, imageSrc, alt, onClick }: Props) => {
  const imageButton = createButton(alt, classNames, buttonId);
  const buttonImage = createImage({ src: imageSrc, alt });

  imageButton.append(buttonImage);
  if (onClick) imageButton.addEventListener('click', onClick);
  return imageButton;
};

const createButton = (alt: string, classNames?: string[], id?: string) => {
  const button = dom.createButtonTag({
    id,
    classNames,
    ariaLabel: alt,
  });
  return button;
};

const createImage = (imageAttributes: IImageAttributes) => {
  const { src, alt, classNames } = imageAttributes;
  const image = dom.createImageTag({
    src,
    alt,
    classNames,
  });

  return image;
};

export default createImageButton;
