interface Props {
  imageSrc: string;
  onClick?: () => void;
}

const createImageButton = ({ imageSrc, onClick }: Props) => {
  const imageButton = document.createElement('button');
  const buttonImage = document.createElement('img');

  imageButton.setAttribute('type', 'button');
  imageButton.classList.add('gnb__button');
  imageButton.setAttribute('aria-label', '음식점 추가');
  buttonImage.setAttribute('src', imageSrc);
  buttonImage.setAttribute('alt', '음식점 추가');

  imageButton.append(buttonImage);
  if (onClick) imageButton.addEventListener('click', onClick);
  return imageButton;
};
export default createImageButton;
