function Tab({ title, isEnable = false, type }) {
  const buttonTabElement = document.createElement("button");
  buttonTabElement.className = "tab";
  buttonTabElement.dataset.type = type;

  if (isEnable) {
    buttonTabElement.classList.add("enabled");
  }

  buttonTabElement.innerHTML = `
    <p data>${title}</p>
  `;

  return buttonTabElement;
}

export default Tab;
