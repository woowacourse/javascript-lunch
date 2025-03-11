import createElement from "../../utils/createElement/createElement";

const Description = (text, ellipsis) => {
  const description = createElement({
    tagName: "p",
    classNames: ["restaurant__description", "text-body"],
    text: text,
  });

  if (ellipsis) {
    description.classList.add("text-ellipsis");
  }

  return description;
};

export default Description;
