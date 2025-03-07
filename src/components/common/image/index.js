const Image = (src, alt, className) => {
  const image = document.createElement("img");
  image.setAttribute("src", src);
  image.setAttribute("alt", alt);
  image.classList.add(className);

  return image;
};

export default Image;
