import text from "./@common/text";

const restaurantItem = (props) => {
  const { category, categoryAlt, title, distance, description } = props;

  return `
    <li class="restaurant">
      <div class="restaurant__category">
        <img
          src="/category-${category}.png"
          alt="${categoryAlt}"
          class="category-icon"
        />
      </div>
      
      <div class="restaurant__info">
        ${text({ tag: "h3", size: "large", children: title })}
        ${text({
          tag: "span",
          size: "medium",
          color: "orange",
          children: `캠퍼스부터 ${distance}분 내`,
        })}
        <p class="restaurant__description text-body">
          ${description}
        </p>
      </div>
    </li>
  `;
};

export default restaurantItem;
