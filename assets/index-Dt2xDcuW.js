var __defProp = Object.defineProperty;
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var _selectValue, _isOpen, _content, _container, _data, _id, _category, _name, _distance, _description, _link, _isFavorite, _cssType, _isModalFoodItem, _originFoodItems, _renderFoodItems, _currentMenu;
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
let filterChangeListeners = [];
function addFilterChangeListeners(listener) {
  filterChangeListeners.push(listener);
}
function notifyFilterChange(id) {
  filterChangeListeners.forEach((listener) => listener(id));
}
let sortChangeListeners = [];
function addSortChangeListeners(listener) {
  sortChangeListeners.push(listener);
}
function notifySortChange(id) {
  sortChangeListeners.forEach((listener) => listener(id));
}
class Dropdown {
  constructor({ name, options, type }) {
    __publicField(this, "container");
    __publicField(this, "name");
    __publicField(this, "options");
    __publicField(this, "type");
    __privateAdd(this, _selectValue);
    this.container = document.createElement("div");
    this.options = options;
    this.name = name;
    this.type = type;
    __privateSet(this, _selectValue, "");
    this.render();
    this.setDropdownValue();
  }
  get selectValue() {
    return __privateGet(this, _selectValue);
  }
  get element() {
    return this.container.firstElementChild;
  }
  render() {
    this.container.innerHTML = `
        <select name=${this.name} id=${this.name}>
            ${this.options.map((option) => `<option value="${option.value}">${option.label}</option>`).join("")}
        </select>
    `;
  }
  setDropdownValue() {
    this.container.querySelectorAll("select").forEach(
      (element) => element.addEventListener("change", (event) => {
        const target = event.target;
        if (target && this.type === "filter") {
          __privateSet(this, _selectValue, target.value);
          notifyFilterChange(__privateGet(this, _selectValue));
        }
        if (target && this.type === "sort") {
          __privateSet(this, _selectValue, target.value);
          notifySortChange(__privateGet(this, _selectValue));
        }
      })
    );
  }
}
_selectValue = new WeakMap();
class DropdownContainer {
  constructor({ dropdowns }) {
    __publicField(this, "container");
    __publicField(this, "dropdowns");
    this.container = document.createElement("div");
    this.container.classList.add("restaurant-filter-container");
    this.dropdowns = dropdowns;
    this.render();
  }
  get element() {
    return this.container;
  }
  render() {
    this.container.innerHTML = "";
    this.dropdowns.forEach((dropdown) => {
      if (dropdown.element) {
        this.container.appendChild(dropdown.element);
      }
    });
  }
}
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
const DROPDOWN_OPTIONS = {
  category: [
    { value: "", label: "전체" },
    { value: "한식", label: "한식" },
    { value: "중식", label: "중식" },
    { value: "일식", label: "일식" },
    { value: "양식", label: "양식" },
    { value: "아시안", label: "아시안" },
    { value: "기타", label: "기타" }
  ],
  sort: [
    { value: "이름순", label: "이름순" },
    { value: "거리순", label: "거리순" }
  ]
};
const NAME_MAX_LENGTH = 20;
const DESCRIPTION_MAX_LENGTH = 200;
const CAPTION = {
  description: "메뉴 등 추가 정보를 입력해 주세요",
  link: "매장 정보를 확인할 수 있는 링크를 입력해 주세요"
};
const DELETE = "정말 삭제하시겠습니까? 삭제 이후에는 복구할 수 없습니다.";
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
    new URL(input);
  } catch (error) {
    throw new Error(ERROR_MESSAGE.url);
  }
}
function Button({ name, type = "button", cssType = "primary", innerText, onClick = () => {
} }) {
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
function Input({ isRequired = false, name, label, caption = "" }) {
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
function SelectInput({ isRequired = false, name, label, optionList = [] }) {
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
                <label for="description text-caption">${label}</label>
              <textarea
                name=${name}
                id="description"
                cols="30"
                rows="5"
                ${isRequired ? "required" : ""}
              ></textarea>
              <span class="help-text text-caption"
                >${caption}</span
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
    __publicField(this, "container");
    this.container = document.createElement("form");
    this.container.setAttribute("novalidate", "true");
    const title = document.createElement("h2");
    title.classList.add("modal-title", "text-title");
    title.innerText = "새로운 음식점";
    this.container.appendChild(title);
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
      } catch (error) {
        const customError = error;
        alertError(customError.message);
      }
    };
  }
  getFormInputs() {
    const formData = new FormData(this.container);
    const formObject = Object.fromEntries(formData.entries());
    return {
      ...formObject,
      id: crypto.randomUUID(),
      isFavorite: false
    };
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
let deleteChangeListeners = [];
function addDeleteItemChangeListeners(listener) {
  deleteChangeListeners.push(listener);
}
function notifyDeleteChange(id) {
  deleteChangeListeners.forEach((listener) => listener(id));
}
let favoriteChangeListeners = [];
function addFavoriteChangeListeners(listener) {
  favoriteChangeListeners.push(listener);
}
function notifyFavoriteChange(id) {
  favoriteChangeListeners.forEach((listener) => listener(id));
}
function storeFoodItems(foodItems) {
  localStorage.setItem("foodItems", JSON.stringify(foodItems));
}
function getStoredFoodItems() {
  const storedItems = localStorage.getItem("foodItems");
  if (storedItems) return JSON.parse(storedItems);
  return [];
}
function removeStoredFoodItem(id) {
  const filteredItems = getStoredFoodItems().filter((item) => item.id !== id);
  localStorage.setItem("foodItems", JSON.stringify(filteredItems));
}
function toggleFavorite(id) {
  const resultItems = getStoredFoodItems().map((foodItem) => {
    if (foodItem.id === id) {
      return { ...foodItem, isFavorite: !foodItem.isFavorite };
    }
    return foodItem;
  });
  storeFoodItems(resultItems);
  notifyFavoriteChange(id);
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
class Modal {
  constructor({ content }) {
    __privateAdd(this, _isOpen, false);
    __privateAdd(this, _content);
    __privateAdd(this, _container);
    __privateSet(this, _content, content);
    __privateSet(this, _container, document.createElement("div"));
    __privateGet(this, _container).classList.add("modal");
    __privateGet(this, _container).innerHTML = `
      <div class="modal-backdrop"></div>
      <div class="modal-container">
      </div>
      
`;
    __privateGet(this, _container).querySelector(".modal-container").appendChild(__privateGet(this, _content));
    __privateGet(this, _container).querySelector(".modal-backdrop").addEventListener("click", () => this.close());
    this.close();
  }
  open() {
    __privateSet(this, _isOpen, true);
    __privateGet(this, _container).classList.add("modal--open");
  }
  close() {
    __privateSet(this, _isOpen, false);
    __privateGet(this, _container).classList.remove("modal--open");
  }
  get isOpen() {
    return __privateGet(this, _isOpen);
  }
  get element() {
    return __privateGet(this, _container);
  }
}
_isOpen = new WeakMap();
_content = new WeakMap();
_container = new WeakMap();
const _FoodItem = class _FoodItem {
  constructor({ data, cssType, isModalFoodItem = false }) {
    __publicField(this, "container");
    __privateAdd(this, _data);
    __privateAdd(this, _id);
    __privateAdd(this, _category);
    __privateAdd(this, _name);
    __privateAdd(this, _distance);
    __privateAdd(this, _description);
    __privateAdd(this, _link);
    __privateAdd(this, _isFavorite);
    __privateAdd(this, _cssType);
    __privateAdd(this, _isModalFoodItem);
    __privateSet(this, _data, data);
    __privateSet(this, _cssType, cssType);
    __privateSet(this, _isModalFoodItem, isModalFoodItem);
    __privateSet(this, _id, data.id);
    __privateSet(this, _category, data.category);
    __privateSet(this, _name, data.name);
    __privateSet(this, _distance, data.distance);
    __privateSet(this, _description, data.description);
    __privateSet(this, _isFavorite, data.isFavorite);
    __privateSet(this, _link, data.link);
    this.container = document.createElement("div");
    this.render();
    this.setUpFavoriteToggle();
    this.setCss();
    if (!__privateGet(this, _isModalFoodItem)) {
      this.showDetail();
    }
  }
  get element() {
    return this.container.firstElementChild;
  }
  getBookmarkIconSrc() {
    if (__privateGet(this, _isFavorite)) {
      return "/favorite-icon-filled.png";
    }
    return "/favorite-icon-lined.png";
  }
  setCss() {
    var _a;
    if (__privateGet(this, _cssType) === "column") {
      (_a = this.container.querySelector("li")) == null ? void 0 : _a.classList.add("restaurant-detail");
    }
  }
  render() {
    const { imgAlt, imgSrc } = getImgSrcAlt(__privateGet(this, _category));
    this.container.innerHTML = `
              <li class="restaurant">
            <div class="restaurant__category">
              <img
                src=${imgSrc}
                alt=${imgAlt}
                class="category-icon"
              />
            </div>
            <div class="restaurant__info">
              <h3 class="restaurant__name text-subtitle">${__privateGet(this, _name)}</h3>
              <span class="restaurant__distance text-body"
                >캠퍼스부터 ${__privateGet(this, _distance)}분 내</span
              >
              <p class="restaurant__description ${__privateGet(this, _cssType) === "column" ? "restaurant__description-detail" : ""} text-body">
               ${__privateGet(this, _description)}
              </p>
              ${__privateGet(this, _cssType) === "column" && __privateGet(this, _link) ? `<p>${__privateGet(this, _link)}</p>` : ""}
              <img src=${this.getBookmarkIconSrc()} alt="즐겨찾기" class="favorite-icon">
            </div>
          </li>
  `;
  }
  setUpFavoriteToggle() {
    const bookmarkIcon = this.container.querySelector(".favorite-icon");
    if (!bookmarkIcon) return;
    bookmarkIcon.addEventListener("click", (event) => {
      event.stopPropagation();
      __privateSet(this, _isFavorite, !__privateGet(this, _isFavorite));
      bookmarkIcon.setAttribute("src", this.getBookmarkIconSrc());
      toggleFavorite(__privateGet(this, _id));
      this.render();
    });
  }
  showDetail() {
    var _a;
    (_a = this.container.querySelector("li")) == null ? void 0 : _a.addEventListener("click", () => {
      var _a2;
      if (__privateGet(this, _isModalFoodItem)) return;
      const fragment = document.createDocumentFragment();
      const detailFoodItem = new _FoodItem({
        data: __privateGet(this, _data),
        cssType: "column",
        isModalFoodItem: true
      });
      if (!detailFoodItem.element) return;
      fragment.appendChild(detailFoodItem.element);
      const buttonContainer = ButtonContainer({
        buttons: [
          Button({
            name: "delete",
            innerText: "삭제하기",
            cssType: "secondary",
            onClick: () => {
              detailFoodItem.deleteItem();
              detailModal.close();
            }
          }),
          Button({ name: "close", innerText: "닫기", onClick: () => detailModal.close() })
        ]
      });
      fragment.appendChild(buttonContainer);
      const detailModal = new Modal({ content: fragment });
      detailModal.open();
      (_a2 = document.querySelector("body")) == null ? void 0 : _a2.appendChild(detailModal.element);
    });
  }
  deleteItem() {
    if (confirm(DELETE)) {
      notifyDeleteChange(__privateGet(this, _id));
      removeStoredFoodItem(__privateGet(this, _id));
      this.render();
    }
  }
};
_data = new WeakMap();
_id = new WeakMap();
_category = new WeakMap();
_name = new WeakMap();
_distance = new WeakMap();
_description = new WeakMap();
_link = new WeakMap();
_isFavorite = new WeakMap();
_cssType = new WeakMap();
_isModalFoodItem = new WeakMap();
let FoodItem = _FoodItem;
class FoodList {
  constructor({ foodItems }) {
    __privateAdd(this, _originFoodItems);
    __privateAdd(this, _renderFoodItems);
    __publicField(this, "foodList");
    __privateSet(this, _originFoodItems, foodItems);
    __privateSet(this, _renderFoodItems, foodItems);
    this.foodList = document.createElement("ul");
    this.foodList.className = "restaurant-list";
    this.updateSortItem("이름순");
    addFavoriteChangeListeners(this.updateFavoriteItem.bind(this));
    addDeleteItemChangeListeners(this.updateDeleteItem.bind(this));
    addFilterChangeListeners(this.updateFilterItem.bind(this));
    addSortChangeListeners(this.updateSortItem.bind(this));
    this.render();
  }
  get element() {
    return this.foodList;
  }
  render() {
    this.foodList.innerHTML = "";
    this.checkAndRenderEmptyList();
    const foodFragment = document.createDocumentFragment();
    __privateGet(this, _renderFoodItems).forEach((foodItem) => {
      const foodItemElement = new FoodItem({
        data: foodItem,
        cssType: "row"
      }).element;
      if (foodItemElement) {
        foodFragment.appendChild(foodItemElement);
      }
    });
    this.foodList.appendChild(foodFragment);
  }
  checkAndRenderEmptyList() {
    if (__privateGet(this, _originFoodItems).length === 0) {
      this.foodList.innerHTML = `
      <p class="empty-message">음식점이 없습니다. 우측 상단 버튼을 눌러 추가해 주세요.</p>
    `;
      return;
    }
    if (__privateGet(this, _renderFoodItems).length === 0) {
      this.foodList.innerHTML = `
        <p class="empty-message">즐겨찾기한 음식점이 없습니다.</p>
      `;
      return;
    }
  }
  addItem(foodItem) {
    __privateSet(this, _originFoodItems, [...__privateGet(this, _originFoodItems), foodItem]);
    __privateSet(this, _renderFoodItems, __privateGet(this, _originFoodItems));
    storeFoodItems(__privateGet(this, _originFoodItems));
    this.render();
  }
  filterFavoriteItem() {
    __privateSet(this, _renderFoodItems, __privateGet(this, _originFoodItems).filter((foodItem) => foodItem.isFavorite));
    this.render();
  }
  resetFavoriteFilter() {
    __privateSet(this, _renderFoodItems, __privateGet(this, _originFoodItems));
    this.render();
  }
  updateFavoriteItem(id) {
    __privateSet(this, _originFoodItems, __privateGet(this, _originFoodItems).map((foodItem) => {
      if (foodItem.id === id) {
        foodItem.isFavorite = !foodItem.isFavorite;
      }
      return foodItem;
    }));
    this.render();
  }
  updateDeleteItem(id) {
    __privateSet(this, _originFoodItems, __privateGet(this, _originFoodItems).filter((foodItem) => foodItem.id !== id));
    __privateSet(this, _renderFoodItems, __privateGet(this, _originFoodItems));
    this.render();
  }
  updateFilterItem(category) {
    if (category === "") {
      __privateSet(this, _renderFoodItems, __privateGet(this, _originFoodItems));
      this.render();
      return;
    }
    __privateSet(this, _renderFoodItems, __privateGet(this, _originFoodItems).filter((foodItem) => foodItem.category === category));
    this.render();
  }
  updateSortItem(sortType) {
    if (sortType === "이름순") {
      __privateGet(this, _renderFoodItems).sort((a, b) => a.name.localeCompare(b.name));
    }
    if (sortType === "거리순") {
      __privateGet(this, _renderFoodItems).sort((a, b) => a.distance - b.distance);
    }
    this.render();
  }
}
_originFoodItems = new WeakMap();
_renderFoodItems = new WeakMap();
function IconButton({ cssType = "primary", name, imgSrc, label, onClick = () => {
} }) {
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
class TabMenu {
  constructor() {
    __publicField(this, "container");
    __privateAdd(this, _currentMenu, "all");
    __publicField(this, "onTabChange", () => {
    });
    this.container = document.createElement("div");
    this.container.classList.add("tabmenu-container");
    this.render();
  }
  render() {
    this.container.innerHTML = `
     <button class="tabmenu-item" data-tab="all">모든 음식점</button>
     <button class="tabmenu-item" data-tab="favorite">자주 가는 음식점</button>
    `;
    this.setActiveTabStyle();
    this.handleCurrentMenu();
  }
  handleCurrentMenu() {
    var _a;
    (_a = this.container.querySelectorAll(".tabmenu-item")) == null ? void 0 : _a.forEach(
      (tabMenu) => tabMenu.addEventListener("click", (event) => {
        const target = event.target;
        if (!target) return;
        const currentMenu = target.dataset.tab;
        if (currentMenu === "all" || currentMenu === "favorite") {
          __privateSet(this, _currentMenu, currentMenu);
          this.setActiveTabStyle();
          this.onTabChange();
        }
      })
    );
  }
  setActiveTabStyle() {
    var _a, _b;
    (_a = this.container.querySelector(".tabmenu--active")) == null ? void 0 : _a.classList.remove("tabmenu--active");
    (_b = this.container.querySelector(`[data-tab=${__privateGet(this, _currentMenu)}]`)) == null ? void 0 : _b.classList.add("tabmenu--active");
  }
  get element() {
    return this.container;
  }
  get currentMenu() {
    return __privateGet(this, _currentMenu);
  }
}
_currentMenu = new WeakMap();
class MainPage {
  constructor() {
    __publicField(this, "container");
    __publicField(this, "foodList");
    __publicField(this, "modal");
    __publicField(this, "foodForm");
    __publicField(this, "tabMenu");
    __publicField(this, "dropdownContainer");
    this.foodList = new FoodList({ foodItems: getStoredFoodItems() });
    this.foodForm = new FoodForm({
      onModalClose: () => this.modal.close(),
      onSubmit: this.handleSubmit.bind(this)
    });
    this.modal = new Modal({
      content: this.foodForm.element
    });
    this.tabMenu = new TabMenu();
    this.tabMenu.onTabChange = () => {
      this.render();
    };
    const dropdowns = [
      new Dropdown({ name: "category", options: DROPDOWN_OPTIONS.category, type: "filter" }),
      new Dropdown({ name: "sort", options: DROPDOWN_OPTIONS.sort, type: "sort" })
    ];
    this.dropdownContainer = new DropdownContainer({ dropdowns });
    this.container = document.createElement("div");
    const body = document.querySelector("body");
    body.appendChild(this.modal.element);
    body.appendChild(Header({ title: "점심 뭐 먹지?", onAddClick: () => this.modal.open() }));
    body.appendChild(this.tabMenu.element);
    body.appendChild(this.container);
    this.render();
  }
  getFoodListElement() {
    if (this.tabMenu.currentMenu === "favorite") {
      this.foodList.filterFavoriteItem();
      return this.foodList.element;
    }
    this.foodList.resetFavoriteFilter();
    return this.foodList.element;
  }
  render() {
    this.container.innerHTML = "";
    if (this.dropdownContainer.element) {
      this.container.appendChild(this.dropdownContainer.element);
    }
    this.container.appendChild(this.getFoodListElement());
  }
  handleSubmit(formData) {
    this.foodList.addItem(formData);
    this.modal.close();
  }
}
window.addEventListener("load", () => {
  new MainPage();
});
