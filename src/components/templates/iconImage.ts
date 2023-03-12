import { ElementIdentifier } from '@res/interfaces/ElementIdentifier';
import { setAttribute } from '@res/utils/domUtils';

type iconOption = {
  src: string;
  alt: string;
};

export const iconImageTemplate = (opiton: iconOption, identifier: ElementIdentifier) => {
  const { src, alt } = opiton;
  const { idName, className } = identifier;

  return `<img src="${src}" alt="${alt}" ${setAttribute('id', idName)}, ${setAttribute(
    'class',
    className
  )}/>`;
};
