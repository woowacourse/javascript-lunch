const TextButton = {
  create({ title, onClick, id }, type) {
    const TextButtonElement = document.createElement("button");
    TextButtonElement.setAttribute("id", id);
    TextButtonElement.setAttribute("class", "button");
    TextButtonElement.setAttribute("type", "button");
    TextButtonElement.classList.add("text-caption");
    if (type === "secondary")
      TextButtonElement.classList.add("button--secondary");
    if (type === "primary") {
      TextButtonElement.setAttribute("type", "submit");
      TextButtonElement.classList.add("button--primary");
    }
    TextButtonElement.addEventListener("click", onClick);
    TextButtonElement.innerText = title;

    return TextButtonElement;
  },
};

export default TextButton;
