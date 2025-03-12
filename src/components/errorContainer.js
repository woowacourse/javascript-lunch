const errorContainer = (component, fallbackComponent) => {
  try {
    component();
  } catch {
    fallbackComponent();
  }
};

export default errorContainer;
