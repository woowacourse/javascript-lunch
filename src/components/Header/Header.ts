interface Props {
  title: string;
  imageSource: string;
  onClick: () => void;
}

const Header = ({ title, imageSource, onClick }: Props) => {
  const header = document.createElement('header');
  const headerTitle = document.createElement('h1');
  const addButton = document.createElement('button');
  const image = document.createElement('img');

  header.classList.add('gnb');
  headerTitle.textContent = title;
  headerTitle.classList.add('gnb__title', 'text-title');
  addButton.classList.add('gnb__button');
  image.setAttribute('type', 'button');
  image.setAttribute('src', imageSource);

  addButton.appendChild(image);
  header.appendChild(headerTitle);
  header.appendChild(addButton);

  if (onClick) {
    addButton.addEventListener('click', onClick);
  }

  return header;
};

export default Header;
