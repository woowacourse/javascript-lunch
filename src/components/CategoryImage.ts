import findImage from "../tools/findImage";

export const CategoryImage = (category: string) => `
  <img
    src="${findImage(category)}" 
    alt="${category}" 
    class="category-icon"
  >
`;
