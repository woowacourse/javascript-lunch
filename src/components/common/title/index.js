const Title = ({ text, tagName, handleClickTitle, className }) => {
  const title = document.createElement(tagName);

  [...className].forEach((name) => title.classList.add(name));

  title.textContent = text;
  title.addEventListener("click", () => handleClickTitle());
  return title;
};

export default Title;
