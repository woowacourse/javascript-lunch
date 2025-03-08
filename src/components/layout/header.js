const $header = ({ title, buttonTitle, buttonImage }) => {
  const header = document.createElement("header");
  header.classList.add("gnb");

  const headerTitle = document.createElement("h1");
  headerTitle.classList.add("gnb__title", "text-title");
  headerTitle.innerText = title;
  header.appendChild(headerTitle);

  const button = document.createElement("button");
  button.type = "button";
  button.classList.add("gnb__button");
  button.setAttribute("aria-label", buttonTitle);

  const img = document.createElement("img");
  img.src = buttonImage;
  img.alt = buttonTitle;

  button.appendChild(img);
  header.appendChild(button);

  return header;
};

export default $header;
