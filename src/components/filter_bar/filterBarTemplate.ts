import { CATEGORIES, CategoryValue, SORTS } from "../../constants/system";

export const baseSectionTemplate = /*html*/ `
<main>
  <section class="restaurant-filter-container">
  </section>
</main>
`;

export const filterSelectTemplate = /*html*/ `
<select name="category" id="category-filter" class="restaurant-filter">
  <option value="${CATEGORIES.ALL}">${CATEGORIES.ALL}</option>
  ${Object.values(CATEGORIES)
    .filter((value) => value !== CATEGORIES.ALL)
    .map(
      (category: CategoryValue) => `
    <option value="${category}">${category}</option>
  `,
    )
    .join("")}
</select>`;

export const sortSelectTemplate = /*html*/ `
<select name="sorting" id="sorting-filter" class="restaurant-filter">
  <option value="name">${SORTS.BYNAME}</option>
  <option value="distance">${SORTS.BYDISTANCE}</option>
</select>
`;
