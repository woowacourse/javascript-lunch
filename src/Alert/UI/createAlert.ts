const createAlert = (id: string): HTMLElement => {
  const element = document.createElement("div");
  element.setAttribute("class", "alert");
  if (id) element.setAttribute("id", id);
  return element;
};

export default createAlert;
