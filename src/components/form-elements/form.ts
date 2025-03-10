import { addRestaurant } from "../modal/modal.js";

export const handleAddRestaurant = (e: Event) => {
  e.preventDefault();

  try {
    const form = document.getElementById("add-restaurant-form") as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
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
  const requiredFields = form.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(
    "input[required], select[required], textarea[required]"
  );
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

const $form = (formFields: HTMLElement[]): HTMLFormElement => {
  const form = document.createElement("form");
  form.id = "add-restaurant-form";

  formFields.forEach((field) => {
    form.appendChild(field);
  });

  form.addEventListener("submit", handleAddRestaurant);

  return form;
};

export default $form;
