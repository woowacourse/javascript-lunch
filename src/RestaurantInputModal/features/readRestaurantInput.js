const readRestaurantInput = (modal) => {
  const category = modal.element.querySelector("#category").value;
  const name = modal.element.querySelector("#name").value;
  const estimatedTime = modal.element.querySelector("#distance").value;
  const description = modal.element.querySelector("#description").value;
  const link = modal.element.querySelector("#link").value;

  return {
    category, name, estimatedTime, description, link,
  };
};

export default readRestaurantInput;
