import setAttributes from '../../utils/setAttributes';

interface Props {
  img: {
    class?: string;
    src: string;
    alt?: string;
  };
}

export const Img = ({ img }: Props): HTMLImageElement => {
  const $img = document.createElement('img');
  setAttributes($img, img);

  return $img;
};
