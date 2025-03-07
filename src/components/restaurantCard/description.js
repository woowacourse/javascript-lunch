const Description = (text, ellipsis) => {
  const description = document.createElement("p");
  description.classList.add("restaurant__description", "text-body");
  description.textContent = text;

  if (ellipsis) {
    description.classList.add("text-ellipsis");
  }

  return description;
};

export default Description;
