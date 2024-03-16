import { createImageButton } from './ImageButton';

interface Props {
  titleTextContent: string;
  buttonImageSource: string;
}

export const createAppHeader = ({ titleTextContent, buttonImageSource }: Props): HTMLElement => {
  const $header = document.createElement('header');
  const $title = document.createElement('h1');
  const $imageButton = createImageButton({ imageSource: buttonImageSource });

  $header.classList.add('app-header');
  $title.classList.add('app-header__title', 'text-title');
  $title.textContent = titleTextContent;

  $header.appendChild($title);
  $header.appendChild($imageButton);

  console.log($header);

  return $header;
};
