const TabButton = (props) => {
  const { name, isActive } = props;
  const className = isActive ? "tab-button active-tab" : "tab-button";
  const tabButton = document.createElement("button");
  Object.assign(tabButton, {
    className,
    ariaLabel: name,
    textContent: name,
  });

  return tabButton;
};

export default TabButton;
