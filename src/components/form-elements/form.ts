import {
  addRestaurant,
  RestaurantProps,
} from "../modal/add-restaurant-modal.ts";

export const handleAddRestaurant = (e: Event) => {
  e.preventDefault();

  try {
    const form = document.getElementById(
      "add-restaurant-form"
    ) as HTMLFormElement;
    const formData = new FormData(form);

    const data: RestaurantProps = {
      category: formData.get("category") as string,
      name: formData.get("name") as string,
      distance: formData.get("distance") ? Number(formData.get("distance")) : 0,
      description: formData.get("description") as string,
      link: formData.get("link") as string,
      isFavorite: false,
    };

    validateForm(form);
    addRestaurant(data);
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
    } else {
      alert("알 수 없는 오류가 발생했습니다.");
    }
  }
};

const validateForm = (form: HTMLFormElement) => {
  const requiredFields = form.querySelectorAll<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >("input[required], select[required], textarea[required]");
  requiredFields.forEach((requiredField) => {
    if (!requiredField.value.trim()) {
      const label = document.querySelector<HTMLLabelElement>(
        `label[for="${requiredField.id} text-caption"]`
      );
      const labelText = label ? label.innerText : "";
      throw new Error(`${labelText}(은)는 필수 값입니다.`);
    }
  });
};

const $form = (form: HTMLElement | HTMLElement[]): HTMLFormElement => {
  const wrapper = document.createElement("form");
  wrapper.id = "add-restaurant-form";

  if (Array.isArray(form)) {
    form.forEach((element) => wrapper.appendChild(element));
  } else {
    wrapper.appendChild(form);
  }

  return wrapper;
};

export default $form;
