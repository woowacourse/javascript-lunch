import { ERROR } from "../constants/message";

const isValidUrl = (url: string) => {
  const pattern = new RegExp(
    "^([a-zA-Z]+:\\/\\/)?" +
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
      "((\\d{1,3}\\.){3}\\d{1,3}))" +
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
      "(\\?[;&a-z\\d%_.~+=-]*)?" +
      "(\\#[-a-z\\d_]*)?$",
    "i"
  );

  return pattern.test(url);
};

export const validateRestaurantForm = (form: HTMLFormElement) => {
  if (!form.category.value) {
    const categoryLabelText = document.querySelector(
      `label[for="category"]`
    )?.textContent;
    throw new Error(`${categoryLabelText}${ERROR.INVALID_REQUIRED}`);
  }

  const inputEl = form.name as unknown as HTMLInputElement;
  if (!inputEl.value.trim()) {
    const nameLabelText =
      document.querySelector(`label[for="name"]`)?.textContent;
    throw new Error(`${nameLabelText}${ERROR.INVALID_REQUIRED}`);
  }

  if (!form.distance.value) {
    const distanceLabelText = document.querySelector(
      `label[for="distance"]`
    )?.textContent;
    throw new Error(`${distanceLabelText}${ERROR.INVALID_REQUIRED}`);
  }

  if (form.link.value && !isValidUrl(form.link.value)) {
    const distanceLabelText =
      document.querySelector(`label[for="link"]`)?.textContent;
    throw new Error(`${distanceLabelText}${ERROR.INVALID_URL}`);
  }
};
