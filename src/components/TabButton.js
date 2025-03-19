const TabButton = (props) => {
  const { name, isActive } = props;
  const className = `tab-button ${isActive ? "active-tab" : ""}`;
  const tabButton = document.createElement("button");
  Object.assign(tabButton, {
    className,
    ariaLabel: name,
    textContent: name,
  });

  return tabButton;
};

export default TabButton;
