const $tabContainer = (tabs) => {
  const container = document.createElement("nav");
  container.classList.add("tab-container");

  tabs.forEach((tab) => {
    container.appendChild(tab);
  });

  return container;
};

export default $tabContainer;
