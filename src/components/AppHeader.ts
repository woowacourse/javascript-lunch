interface Props {
  titleTextContent: string;
  buttonImageSource: string;
}

export const createAppHeader = ({ titleTextContent, buttonImageSource }: Props): HTMLElement => {
  const header = document.createElement('header');
  const title = document.createElement('h1');
  const button = document.createElement('button');
  const buttonImage = document.createElement('img');

  header.classList.add('app-header');
  title.classList.add('app-header__title', 'text-title');
  title.textContent = titleTextContent;
  button.classList.add('app-header__button');
  buttonImage.src = buttonImageSource;
  buttonImage.alt = '음식점 추가';

  button.appendChild(buttonImage);
  header.appendChild(title);
  header.appendChild(button);

  console.log(header);

  return header;
};
