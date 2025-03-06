import $form from "./form";
import $inputItem from "./input-item";

export const handleModalClose = () => {
  document.querySelector(".modal").classList.remove("modal--open");
}

export const handleAddRestaurant = (e) => {
    e.preventDefault();

    try {
        validateForm(['category', 'name', 'distance']);
        addRestaurant();
    } catch (error) {
        alert(error.message);
    }
}

const validateForm = (requiredFields) => {
    const form = document.getElementById("add-restaurant-form");
    
    requiredFields.forEach((requiredField) => {
      if (!form[requiredField].value.trim()) {
        const labelText = document.querySelector(`label[for="${form[requiredField].id} text-caption"]`).innerText;
        throw new Error(`${labelText}(은)는 필수 값입니다.`);
      }
    });
    
}

const $modal = (form) => {
  const wrapper = document.createElement("div");
  wrapper.classList.add("modal");

  const background = document.createElement("div");
  background.classList.add("modal-backdrop");
  wrapper.appendChild(background);

  const container = document.createElement("div");
  container.classList.add("modal-container");

  const title = document.createElement("h2");
  title.classList.add("modal-title", "text-title");
  title.innerText = "새로운 음식점";
  container.appendChild(title);
  container.appendChild($form(form));
  wrapper.appendChild(container);

  document.addEventListener('keydown',(e)=> {e.key === "Escape" && handleModalClose()})
  background.addEventListener("click", handleModalClose);
  return wrapper;
};

export default $modal;
