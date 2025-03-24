import { categoryValue } from "../../constants/optionValue.js";

const addData = () => {
  const formData = new FormData(
    document.getElementById("input-form") as HTMLFormElement,
  );

  const submittedData = Object.fromEntries(formData);
  const information = {
    name: submittedData.name,
    distance: Number(submittedData.distance),
    description: submittedData.description,
    imgSrc: `./category-${submittedData.category}.png`,
    imgAlt: `${categoryValue[submittedData.category as string]}`,
    category: `${categoryValue[submittedData.category as string]}`,
    link: `${submittedData.link}`,
    id: `restaurant-${Date.now()}`,
  };

  document.dispatchEvent(
    new CustomEvent("restaurantUpdated", { detail: { information } }),
  );
};

export default addData;
