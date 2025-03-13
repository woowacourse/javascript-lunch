import { categoryValue } from "../../data/constants.ts";
import { RestaurantData } from "../../data/RestaurantMockData.ts";

export interface RestaurantInfo {
  name: string;
  distance: number;
  description: string;
  imgSrc: string;
  imgAlt: string;
  link: string;
}

interface FormDataEntries {
  name: string;
  distance: string;
  description: string;
  category: string;
  link: string;
}

const addData = (): RestaurantInfo => {
  const formElement = document.getElementById("input-form") as HTMLFormElement;
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
    link: submittedData.link,
  };

  RestaurantData.push(information);
  return information;
};

export default addData;
