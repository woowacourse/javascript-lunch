export const createElement = (htmlTemplate) => {
  const $el = document.createElement("div");
  $el.innerHTML = htmlTemplate.trim();
  return $el.firstChild;
};
