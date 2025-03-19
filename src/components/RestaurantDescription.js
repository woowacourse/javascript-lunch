const RestaurantDescription = (description, isDetail = false) => {
  const descriptionClass = isDetail
    ? "restaurant__description_detail"
    : "restaurant__description";

  return /*html*/ `
    <p class="text-body ${descriptionClass}">
      ${description}
    </p>
  `;
};

export default RestaurantDescription;
