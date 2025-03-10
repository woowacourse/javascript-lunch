var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var _isOpen;
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
const ERROR_MESSAGE = {
  required: "필수 입력 항목이 비어있습니다.",
  length: (length) => `최대 ${length}자까지 입력할 수 있습니다.`,
  url: "올바르지 않는 URL입니다. (http(s)~ 로 시작하는 URL을 입력해주세요.)"
};
function validateRequiredInput(input) {
  if (input.length === 0) {
    throw new Error(ERROR_MESSAGE.required);
  }
}
function validateLength(input, maxLength) {
  if (input.length > maxLength) {
    throw new Error(ERROR_MESSAGE.length(maxLength));
  }
}
function validateURL(input) {
  if (input.length === 0) {
    return;
  }
  try {
    const url = new URL(input);
  } catch (error) {
    throw new Error(ERROR_MESSAGE.url);
  }
}
function Button({
  name,
  type = "button",
  cssType = "primary",
  innerText,
  onClick = () => {
  }
}) {
  const button = document.createElement("button");
  button.name = name;
  button.type = type;
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
  <input type="text" name="${name}" id="${name}" ${isRequired ? "required" : ""}/>
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
            <select name=${name} id=${name} ${isRequired ? "required" : ""}>
            <option value="">선택해 주세요</option>
            ${optionList.map((option) => {
    return `<option value="${option.value}">${option.label}</option>`;
  })}
            </select>
    `;
  return container;
}
function TextareaInput({ isRequired = false, name, label, caption }) {
  const container = document.createElement("div");
  container.classList.add("form-item");
  if (isRequired) {
    container.classList.add("form-item--required");
  }
  container.innerHTML = `
                <label for="description text-caption">설명</label>
              <textarea
                name=${name}
                id="description"
                cols="30"
                rows="5"
                ${isRequired ? "required" : ""}
              ></textarea>
              <span class="help-text text-caption"
                >메뉴 등 추가 정보를 입력해 주세요.</span
              >
  `;
  return container;
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
class FoodForm {
  constructor({ onModalClose = () => {
  }, onSubmit = () => {
  } }) {
    this.container = document.createElement("form");
    this.container.setAttribute("novalidate", "true");
    this.container.appendChild(
      SelectInput({
        isRequired: true,
        name: "category",
        label: "카테고리",
        optionList: SELECT_OPTIONS.category
      })
    );
    this.container.appendChild(
      Input({
        isRequired: true,
        name: "name",
        label: "이름"
      })
    );
    this.container.appendChild(
      SelectInput({
        isRequired: true,
        name: "distance",
        label: "거리(도보 이동 시간)",
        optionList: SELECT_OPTIONS.distance
      })
    );
    this.container.appendChild(
      TextareaInput({
        isRequired: false,
        label: "설명",
        name: "description",
        caption: CAPTION.description
      })
    );
    this.container.appendChild(
      Input({
        isRequired: false,
        label: "참고 링크",
        name: "link",
        caption: CAPTION.link
      })
    );
    this.container.appendChild(
      ButtonContainer({
        buttons: [
          Button({
            name: "cancel",
            cssType: "secondary",
            innerText: "취소하기",
            onClick: onModalClose
          }),
          Button({
            name: "submit",
            type: "submit",
            cssType: "primary",
            innerText: "추가하기"
          })
        ]
      })
    );
    this.container.onsubmit = (e) => {
      e.preventDefault();
      try {
        const formData = this.getFormInputs();
        this.validateFoodForm(formData);
        onSubmit(formData);
        this.container.reset();
        onModalClose();
      } catch (error) {
        alertError(error.message);
      }
    };
  }
  getFormInputs() {
    const formData = new FormData(this.container);
    return Object.fromEntries(formData.entries());
  }
  validateFoodForm(formData) {
    validateRequiredInput(formData.category);
    validateRequiredInput(formData.name);
    validateLength(formData.name, NAME_MAX_LENGTH);
    validateRequiredInput(formData.distance);
    validateLength(formData.description, DESCRIPTION_MAX_LENGTH);
    validateURL(formData.link);
  }
  get element() {
    return this.container;
  }
}
const categoryMap = {
  한식: { imgAlt: "한식", imgSrc: "./category-korean.png" },
  중식: { imgAlt: "중식", imgSrc: "./category-chinese.png" },
  일식: { imgAlt: "일식", imgSrc: "./category-japanese.png" },
  양식: { imgAlt: "양식", imgSrc: "./category-western.png" },
  아시안: { imgAlt: "아시안", imgSrc: "./category-asian.png" },
  기타: { imgAlt: "기타", imgSrc: "./category-etc.png" }
};
function getImgSrcAlt(category) {
  return categoryMap[category] || categoryMap["기타"];
}
function FoodItem({ category, name, distance, description }) {
  const { imgAlt, imgSrc } = getImgSrcAlt(category);
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
class FoodList {
  constructor({ foodItems: foodItems2 }) {
    this.foodItems = foodItems2;
    this.foodList = document.createElement("ul");
    this.foodList.classList.add("restaurant-list");
    this.render();
  }
  render() {
    this.foodList.innerHTML = "";
    const foodFragment = document.createDocumentFragment();
    this.foodItems.forEach((foodItem) => {
      foodFragment.appendChild(
        FoodItem({
          category: foodItem.category,
          name: foodItem.name,
          distance: foodItem.distance,
          description: foodItem.description
        })
      );
    });
    this.foodList.appendChild(foodFragment);
  }
  addItem(foodItem) {
    this.foodItems = [...this.foodItems, foodItem];
    this.render();
  }
  get element() {
    return this.foodList;
  }
}
function IconButton({
  cssType = "primary",
  name,
  imgSrc,
  label,
  onClick = () => {
  }
}) {
  const container = document.createElement("div");
  container.innerHTML = `
    <button type="button" class="icon-button--${cssType}" aria-label="${label}" name=${name}>
    <img src="${imgSrc}" alt="${label}" /></button
  >
  `;
  container.querySelector("button").addEventListener("click", () => {
    onClick();
  });
  return container.firstElementChild;
}
function Header({ title = "제목", onAddClick = () => {
} }) {
  const header = document.createElement("header");
  header.className = "gnb";
  header.innerHTML = `
    <h1 class="gnb__title text-title">${title}</h1>
   `;
  header.appendChild(
    IconButton({
      name: "add",
      imgSrc: "./add-button.png",
      label: "음식점 추가",
      onClick: onAddClick
    })
  );
  return header;
}
class Modal {
  constructor({ title, content }) {
    __privateAdd(this, _isOpen, false);
    this.title = title;
    this.content = content;
    this.container = document.createElement("div");
    this.container.classList.add("modal");
    this.container.innerHTML = `
      <div class="modal-backdrop"></div>
      <div class="modal-container">
        <h2 class="modal-title text-title">${title}</h2>
      </div>
      
`;
    document.querySelector("body").appendChild(this.container);
    this.container.querySelector(".modal-container").appendChild(this.content);
    this.container.querySelector(".modal-backdrop").addEventListener("click", () => this.close());
    this.close();
  }
  open() {
    __privateSet(this, _isOpen, true);
    this.container.classList.add("modal--open");
  }
  close() {
    __privateSet(this, _isOpen, false);
    this.container.classList.remove("modal--open");
  }
  get isOpen() {
    return __privateGet(this, _isOpen);
  }
}
_isOpen = new WeakMap();
function FoodListPage() {
  const body = document.querySelector("body");
  body.innerHTML = "";
  body.appendChild(
    Header({ title: "점심 뭐 먹지?", onAddClick: () => modal.open() })
  );
  const foodList = new FoodList({ foodItems });
  body.appendChild(foodList.element);
  const modal = new Modal({
    title: "음식점 추가",
    content: new FoodForm({
      onModalClose: () => modal.close(),
      onSubmit: foodList.addItem.bind(foodList)
    }).element
  });
}
addEventListener("load", () => {
  FoodListPage();
});
