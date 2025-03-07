(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
function getImgSrcAlt(category) {
  switch (category) {
    case "한식":
      return { imgAlt: "한식", imgSrc: "./category-korean.png" };
    case "중식":
      return { imgAlt: "중식", imgSrc: "./category-chinese.png" };
    case "일식":
      return { imgAlt: "일식", imgSrc: "./category-japanese.png" };
    case "양식":
      return { imgAlt: "양식", imgSrc: "./category-western.png" };
    case "아시안":
      return { imgAlt: "아시안", imgSrc: "./category-asian.png" };
    default:
      return { imgAlt: "기타", imgSrc: "./category-etc.png" };
  }
}
function FoodItem({ imgSrc, imgAlt, name, distance, description }) {
  const container = document.createElement("div");
  container.innerHTML = `
     <li class="restaurant">
          <div class="restaurant__category">
            <img src=${imgSrc} alt=${imgAlt} class="category-icon">
          </div>
          <div class="restaurant__info">
            <h3 class="restaurant__name text-subtitle">${name}</h3>
            <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 내</span>
            <p class="restaurant__description text-body">${description}</p>
          </div>
        </li>`;
  return container.firstElementChild;
}
function FoodList({ foodItems: foodItems2 }) {
  const foodList = document.createElement("ul");
  foodList.classList.add("restaurant-list");
  const foodFragment = document.createDocumentFragment();
  foodItems2.forEach((foodItem) => {
    const { imgSrc, imgAlt } = getImgSrcAlt(foodItem.category);
    foodFragment.appendChild(
      FoodItem({
        imgSrc,
        imgAlt,
        name: foodItem.name,
        distance: foodItem.distance,
        description: foodItem.description,
        link: foodItem.link
      })
    );
  });
  foodList.appendChild(foodFragment);
  return foodList;
}
const foodItems = [
  {
    category: "한식",
    name: "잇쇼우",
    distance: "10",
    description: "잇쇼우 최선을 다합니다",
    link: "http://www.example."
  },
  {
    category: "일식",
    name: "잇쇼우",
    distance: "10",
    description: "잇쇼우 최선을 다합니다",
    link: "http://www.example."
  }
];
const SELECT_OPTIONS = {
  category: [
    { value: "한식", label: "한식" },
    { value: "중식", label: "중식" },
    { value: "일식", label: "일식" },
    { value: "양식", label: "양식" },
    { value: "아시안", label: "아시안" },
    { value: "기타", label: "기타" }
  ],
  distance: [
    { value: "5", label: "5분 내" },
    { value: "10", label: "10분 내" },
    { value: "15", label: "15분 내" },
    { value: "20", label: "20분 내" },
    { value: "30", label: "30분 내" }
  ]
};
const NAME_MAX_LENGTH = 20;
const DESCRIPTION_MAX_LENGTH = 200;
const CAPTION = {
  description: "메뉴 등 추가 정보를 입력해 주세요",
  link: "매장 정보를 확인할 수 있는 링크를 입력해 주세요"
};
function setError(name) {
  document.querySelector(`[name=${name}]`).classList.add("error");
}
function removeError(name) {
  document.querySelector(`[name=${name}]`).classList.remove("error");
}
function resetError() {
  ["category", "name", "distance", "description", "link"].forEach((key) => {
    return removeError(key);
  });
}
function modalOpen() {
  const modal = document.querySelector(".modal");
  modal.classList.add("modal--open");
}
function modalClose() {
  document.querySelector(".modal--open");
  const modal = document.querySelector(".modal");
  modal.classList.remove("modal--open");
}
const Alert = ({ message }) => {
  const alert = document.createElement("div");
  alert.classList.add("alert");
  alert.classList.add("text-body");
  alert.innerText = message;
  return alert;
};
function alertError(error) {
  if (!document.querySelector(".alert")) {
    document.querySelector("body").appendChild(Alert({ message: error }));
    setTimeout(() => {
      document.querySelector(".alert").remove();
    }, 1500);
  }
}
function getInput(name) {
  const value = document.querySelector(`[name=${name}]`).value;
  return value;
}
const ERROR_MESSAGE = {
  required: "필수 입력 항목이 비어있습니다.",
  length: (length) => `최대 ${length}자까지 입력할 수 있습니다.`,
  url: "올바르지 않는 URL입니다. (http(s)~ 로 시작하는 URL을 입력해주세요.)"
};
function validateRequiredInput(name) {
  if (getInput(name).length === 0) {
    setError(name);
    throw new Error(ERROR_MESSAGE.required);
  }
  removeError(name);
}
function validateLength(name, maxLength) {
  if (getInput(name).length > maxLength) {
    setError(name);
    throw new Error(ERROR_MESSAGE.length(maxLength));
  }
  removeError(name);
}
function validateURL(name) {
  if (getInput(name).length === 0) {
    return;
  }
  try {
    const url = new URL(getInput(name));
  } catch (error) {
    setError(name);
    throw new Error(ERROR_MESSAGE.url);
  }
  removeError(name);
}
function validateFoodItem({
  category,
  name,
  distance,
  description,
  link
}) {
  resetError();
  try {
    validateRequiredInput(category);
    validateRequiredInput(name);
    validateLength(name, NAME_MAX_LENGTH);
    validateRequiredInput(distance);
    validateLength(description, DESCRIPTION_MAX_LENGTH);
    validateURL(link);
  } catch (error) {
    alertError(error.message);
    return;
  }
  return {
    category: getInput(category),
    name: getInput(name),
    distance: getInput(distance),
    description: getInput(description),
    link: getInput(link)
  };
}
function Button({ cssType, innerText, onClick = () => {
} }) {
  const button = document.createElement("button");
  button.type = "button";
  button.classList.add("button");
  button.classList.add(`button--${cssType}`);
  button.classList.add("text-caption");
  button.innerText = innerText;
  button.addEventListener("click", () => {
    onClick();
  });
  return button;
}
function ButtonContainer({ buttons = [] }) {
  const container = document.createElement("div");
  container.className = "button-container";
  buttons.forEach((button) => container.appendChild(button));
  return container;
}
function renderCaption(caption) {
  return caption ? `<span class="help-text text-caption">${caption}</span>` : "";
}
function Input({ isRequired = false, name, label, caption }) {
  const container = document.createElement("div");
  container.classList.add("form-item");
  if (isRequired) {
    container.classList.add("form-item--required");
  }
  container.innerHTML = `
  <label for="link text-caption">${label}</label>
  <input type="text" name="${name}" id="${name}" />
  ${renderCaption(caption)}
  `;
  return container;
}
function SelectInput({
  isRequired = false,
  name,
  label,
  optionList = []
}) {
  const container = document.createElement("div");
  container.classList.add("form-item");
  if (isRequired) {
    container.classList.add("form-item--required");
  }
  container.innerHTML = `         
           <label for="category text-caption">${label}</label>
            <select name=${name} id=${name} required>
            <option value="">선택해 주세요</option>
            ${optionList.map((option) => {
    return `<option value="${option.value}">${option.label}</option>`;
  })}
            </select>
    `;
  return container;
}
function TextareaInput({ isRequired = false, label, caption }) {
  const container = document.createElement("div");
  container.classList.add("form-item");
  if (isRequired) {
    container.classList.add("form-item--required");
  }
  container.innerHTML = `
                <label for="description text-caption">설명</label>
              <textarea
                name="description"
                id="description"
                cols="30"
                rows="5"
              ></textarea>
              <span class="help-text text-caption"
                >메뉴 등 추가 정보를 입력해 주세요.</span
              >
  `;
  return container;
}
function addFoodItem() {
  const foodInfo = validateFoodItem({
    category: "category",
    name: "name",
    distance: "distance",
    description: "description",
    link: "link"
  });
  if (!foodInfo) return;
  const prevFoodItems = foodItems;
  const foodList = FoodList({ foodItems: [...prevFoodItems, foodInfo] });
  FoodListPage(foodList);
}
function FoodForm() {
  const container = document.createElement("form");
  container.appendChild(
    SelectInput({
      isRequired: true,
      name: "category",
      label: "카테고리",
      optionList: SELECT_OPTIONS.category
    })
  );
  container.appendChild(
    Input({
      isRequired: true,
      name: "name",
      label: "이름"
    })
  );
  container.appendChild(
    SelectInput({
      isRequired: true,
      name: "distance",
      label: "거리(도보 이동 시간)",
      optionList: SELECT_OPTIONS.distance
    })
  );
  container.appendChild(
    TextareaInput({
      isRequired: false,
      label: "설명",
      caption: CAPTION.description
    })
  );
  container.appendChild(
    Input({
      isRequired: false,
      label: "참고 링크",
      name: "link",
      caption: CAPTION.link
    })
  );
  container.appendChild(
    ButtonContainer({
      buttons: [
        Button({
          cssType: "secondary",
          innerText: "취소하기",
          onClick: modalClose
        }),
        Button({
          cssType: "primary",
          innerText: "추가하기",
          onClick: addFoodItem
        })
      ]
    })
  );
  return container;
}
function IconButton({ imgSrc, label, onClick = () => {
} }) {
  const container = document.createElement("div");
  container.innerHTML = `
    <button type="button" class="gnb__button" aria-label="${label}">
    <img src="${imgSrc}" alt="${label}" /></button
  >
  `;
  container.querySelector("button").addEventListener("click", () => {
    onClick();
  });
  return container.firstElementChild;
}
function Header({ title = "제목" }) {
  const header = document.createElement("header");
  header.className = "gnb";
  header.innerHTML = `
    <h1 class="gnb__title text-title">${title}</h1>
   `;
  header.appendChild(
    IconButton({
      imgSrc: "./add-button.png",
      label: "음식점 추가",
      onClick: modalOpen
    })
  );
  return header;
}
function Modal({ modalContent }) {
  const container = document.createElement("div");
  container.classList.add("modal");
  container.innerHTML = `
      <div class="modal-backdrop"></div>
      <div class="modal-container">
        <h2 class="modal-title text-title">새로운 음식점</h2>
      </div>
`;
  document.querySelector("body").appendChild(container);
  document.querySelector(".modal-container").appendChild(modalContent);
  document.querySelector(".modal-backdrop").addEventListener("click", () => {
    modalClose();
  });
  return;
}
function FoodListPage(foodList) {
  const body = document.querySelector("body");
  body.innerHTML = "";
  body.appendChild(Header({ title: "점심 뭐 먹지?" }));
  body.appendChild(foodList);
  Modal({ modalContent: FoodForm() });
}
addEventListener("load", () => {
  const foodList = FoodList({ foodItems });
  FoodListPage(foodList);
});
