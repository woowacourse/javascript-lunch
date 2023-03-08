import Validator from '../domain/Validator';

const validateInputData = (formElement: HTMLFormElement) => {
  const { category, restaurantName, distance, link } = formElement;

  try {
    Validator.checkCategory(category.value);
    Validator.checkName(restaurantName.value);
    Validator.checkDistance(distance.value);
    Validator.checkLink(link.value);
    return true;
  } catch (error: unknown) {
    if (error instanceof Error) {
      alert(error.message);
      return false;
    }
  }
};

const getFormData = (formElement: HTMLFormElement) => {
  if (!validateInputData(formElement)) return null;

  const { category, restaurantName, distance, description, link } = formElement;

  return {
    category: category.value,
    name: restaurantName.value,
    distance: distance.value,
    description: description.value,
    link: link.value,
  };
};

export default getFormData;
