import text from "./@common/text";
import koreanIcon from "/category-korean.png";
import chineseIcon from "/category-chinese.png";
import japaneseIcon from "/category-japanese.png";
import westernIcon from "/category-western.png";
import asianIcon from "/category-asian.png";
import etcIcon from "/category-etc.png";
import favoriteIconFilled from "/favorite-icon-filled.png";
import favoriteIconLined from "/favorite-icon-lined.png";

const categoryIcons = {
  korean: koreanIcon,
  chinese: chineseIcon,
  japanese: japaneseIcon,
  western: westernIcon,
  asian: asianIcon,
  etc: etcIcon,
};

const categoryAlt = {
  korean: "한식",
  chinese: "중식",
  japanese: "일식",
  western: "양식",
  asian: "아시아식",
  etc: "기타",
};

const restaurantItem = (props) => {
  const { category, title, distance, description, id, isFavorite } = props;
  return `
    <li class="restaurant" data-id="${id}">
      <div class="restaurant__category">
        <img
          src="${categoryIcons[category]}"
          alt="${categoryAlt[category]}"
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
      <img data-id="${id}" src="${
    isFavorite ? favoriteIconFilled : favoriteIconLined
  }" alt="favorite icon" class="favorite-icon">
    </li>
  `;
};
export default restaurantItem;
