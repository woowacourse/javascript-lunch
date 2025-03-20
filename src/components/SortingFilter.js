const sortingOptions = {
  name: "이름",
  distance: "거리",
};

const SortingFilter = () => {
  const options = Object.entries(sortingOptions);

  return /*html*/ `
    <select name="sorting" id="sorting-filter" class="restaurant-filter" data-testid="sorting-filter">
      ${options
        .map(
          ([option, text]) => ` <option value="${option}">${text}순</option>`
        )
        .join("")}

    </select>
  `;
};

export default SortingFilter;
