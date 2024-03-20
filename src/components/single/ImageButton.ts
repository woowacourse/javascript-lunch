import setAttributes from '../../utils/setAttributes';

interface Props {
  button: {
    'aria-label'?: string;
    class?: string;
    onclick?: () => void;
    type?: string;
  };
  image: {
    alt?: string;
    src: string;
  };
}

export const ImageButton = ({ button, image }: Props): HTMLElement => {
  /* 버튼 */
  const $button = document.createElement('button');
  setAttributes($button, button);

  /* 이미지 */
  const $img = document.createElement('img');
  setAttributes($img, image);

  /* 컴포넌트 조립 */
  $button.appendChild($img);

  return $button;
};
