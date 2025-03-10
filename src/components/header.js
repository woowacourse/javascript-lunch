const $header = (headerInfo) => {
  const header = document.createElement("header");
  header.classList.add("gnb");

  const title = document.createElement("h1");
  title.classList.add("gnb__title", "text-title");
  title.textContent = headerInfo.title;

  const modalButton = document.createElement("button");
  modalButton.type = "button";
  modalButton.classList.add("gnb__button");
  modalButton.ariaLabel = headerInfo.buttonTitle;

  const modalButtonImage = document.createElement("img");
  modalButtonImage.src = headerInfo.buttonImage;
  modalButtonImage.alt = headerInfo.buttonTitle;
  modalButton.appendChild(modalButtonImage);

  header.appendChild(title);
  header.appendChild(modalButton);

  return header;
};

export default $header;
