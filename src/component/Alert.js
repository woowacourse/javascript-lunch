const Alert = {
  create(id) {
    const root = document.createElement("div");
    root.setAttribute("class", "alert");
    if (id) root.setAttribute("id", id);

    return root;
  },

  open(element, message) {
    if (!element.classList.contains("alert--open")) {
      element.innerHTML = message;
      element.classList.add("alert--open");
    }
  },

  close(element) {
    if (element.classList.contains("alert--open")) {
      element.classList.remove("alert--open");
    }
  },
};

export default Alert;
