const getHTML = (id) => document.getElementById(id);

class SubmitEvent {
  constructor(elem) {
    elem.addEventListener("submit", this.onSubmit.bind(this));
  }

  handleRestaurantSubmit(event, form) {
    event.preventDefault();

    const formData = new FormData(form);
    const category = formData.get("category");
    const name = formData.get("name");
    const distance = formData.get("distance");
    const description = formData.get("description");
    const link = formData.get("link");

    this.#addRestaurantItem({ category, name, distance, description, link });
    this.#closeModal();
  }

  #addRestaurantItem({ category, name, distance, description, link }) {
    const restaurantList = getHTML("restaurantList");

    const li = document.createElement("li");
    li.classList.add("restaurant");

    li.innerHTML = `
      <div class="restaurant__category">
        <img src="./images/category-${this.#getCategoryImage(category)}.png" alt="${category}" class="category-icon">
      </div>
      <div class="restaurant__info">
        <h3 class="restaurant__name text-subtitle">${name}</h3>
        <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 내</span>
        <p class="restaurant__description text-body">${description || "설명 없음"}</p>
        ${link ? `<a href="${link}" target="_blank" class="restaurant__link">링크</a>` : ""}
      </div>
    `;

    restaurantList.appendChild(li);
  }

  #getCategoryImage(category) {
    switch (category) {
      case "한식":
        return "korean";
      case "중식":
        return "chinese";
      case "일식":
        return "japanese";
      case "양식":
        return "western";
      case "아시안":
        return "asian";
      case "기타":
        return "etc";
      default:
        return "etc";
    }
  }

  #closeModal() {
    const modalBackground = getHTML("modalBackground");
    modalBackground.classList.remove("show");
  }

  onSubmit(event) {
    event.preventDefault();
    const form = event.target.closest("form");
    if (!form) return;

    if (form.id === "restaurantForm") {
      this.handleRestaurantSubmit(event, form);
    }
    form.reset();
  }
}

new SubmitEvent(document);
