const Title = (text, tagName, ...className) => {
  const title = document.createElement(tagName);
  title.classList.add(...className);
  title.textContent = text;

  return title;
};

export default Title;
