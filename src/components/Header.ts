type HeaderProps = {
  title: string;
};

const createHeader = ({ title }: HeaderProps) => {
  const header = document.querySelector("header");

  const h1 = document.createElement("h1");
  h1.classList.add("gnb__title", "text-title");
  h1.textContent = title;
  header?.appendChild(h1);

  const button = document.createElement("button");
  button.type = "button";
  button.classList.add("gnb__button");
  button.innerHTML = `<img src="images/add-button.png" alt="음식점 추가" />`;
  header?.appendChild(button);

  return header;
};

export default createHeader;
