import { categoryValue } from "../../data/constants.ts";
import { RestaurantData } from "../../data/RestaurantMockData.ts";
import { RestaurantInfo } from "../../data/RestaurantType";

interface FormDataEntries {
  name: string;
  distance: string;
  description: string;
  category: string;
}

const addData = (): RestaurantInfo | null => {
  const formElement = document.getElementById("input-form") as HTMLFormElement;
  if (!formElement) return null;

  const formData = new FormData(formElement);
  const submittedData = Object.fromEntries(
    formData,
  ) as unknown as FormDataEntries;

  const information: RestaurantInfo = {
    name: submittedData.name,
    distance: Number(submittedData.distance),
    description: submittedData.description,
    imgSrc: `./category-${submittedData.category}.png`,
    imgAlt:
      categoryValue[submittedData.category as keyof typeof categoryValue] ||
      "카테고리 없음",
  };

  RestaurantData.push(information);
  return information;
};

export default addData;
