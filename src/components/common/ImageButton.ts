import type { IButtonAttributes, IImageAttributes } from '@/types/dom';

import dom from '@/utils/dom';

interface Props {
  buttonAttributes: IButtonAttributes;
  imageAttributes: IImageAttributes;
  onClick?: () => void;
}

const createImageButton = ({ buttonAttributes, imageAttributes, onClick }: Props) => {
  const imageButton = createButton(buttonAttributes);
  const buttonImage = createImage(imageAttributes);

  imageButton.append(buttonImage);
  if (onClick) imageButton.addEventListener('click', onClick);
  return imageButton;
};

const createButton = (buttonAttributes: IButtonAttributes) => {
  const { id, type, classNames, ariaLabel } = buttonAttributes;
  const button = dom.createButtonTag({
    id,
    type,
    classNames,
    ariaLabel,
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
