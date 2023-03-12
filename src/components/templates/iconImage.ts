import { ElementIdentifier } from '../../interfaces/ElementIdentifier';
import { setAttribute } from '../../utils/domUtils';

type iconOption = {
  src: string;
  alt: string;
};

export const iconImageTemplate = (option: iconOption, identifier: ElementIdentifier) => {
  const { src, alt } = option;
  const { idName, className } = identifier;

  return `<img src="${src}" alt="${alt}" ${setAttribute('id', idName)}, ${setAttribute(
    'class',
    className
  )}/>`;
};
