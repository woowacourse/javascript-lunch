import styleClass from "../constants/styleClass";
import findImage from "../tools/findImage";

export const CategoryImage = (category: string) => `
  <img
    src="${findImage(category)}" 
    alt="${category}" 
    class="${styleClass.category.icon}"
  >
`;
