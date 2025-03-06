import $form from "./form";
import $inputItem from "./input-item";
import $restaurantItem from "./restaurant-item";

const getCategoryIcon = (category) => {
  switch (category) {
    case "한식":
      return "../images/category-korean.png";
    case "중식":
      return "../images/category-chinese.png";
    case "일식":
      return "../images/category-japanese.png";
    case "양식":
      return "../images/category-western.png";
    case "아시안":
      return "../images/category-asian.png";
    default:
      return "../images/category-etc.png";
  }
};

const addRestaurant = (data) => {
  handleModalClose();
  const categoryIcon = getCategoryIcon(data.category);
  const newRestaurant = {
      categoryIcon,
      categoryTitle: data.category,
      name: data.name,
      distance: `캠퍼스부터 ${data.distance}분 내`,
      description: data.description
  };
  document.querySelector(".restaurant-list").appendChild($restaurantItem(newRestaurant));
};

export const handleModalClose = () => {
  document.querySelector(".modal").classList.remove("modal--open");
}

export const handleAddRestaurant = (e) => {
    e.preventDefault();

    try {
      const form = document.getElementById("add-restaurant-form");
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);
        validateForm(['category', 'name', 'distance']);
        addRestaurant(data);
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
