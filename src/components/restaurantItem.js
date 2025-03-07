import text from "./@common/text";
import koreanIcon from "../../public/category-korean.png";
import chineseIcon from "../../public/category-chinese.png";
import japaneseIcon from "../../public/category-japanese.png";
import westernIcon from "../../public/category-western.png";
import asianIcon from "../../public/category-asian.png";
import etcIcon from "../../public/category-etc.png";
const categoryIcons = {
  korean: koreanIcon,
  chinese: chineseIcon,
  japanese: japaneseIcon,
  western: westernIcon,
  asian: asianIcon,
  etc: etcIcon,
};
const restaurantItem = (props) => {
  const { category, categoryAlt, title, distance, description } = props;
  return `
    <li class="restaurant">
      <div class="restaurant__category">
        <img
          src="${categoryIcons[category]}"
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
