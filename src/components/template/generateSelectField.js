import { STORAGE_KEYS } from '../../constants/rules';

const initSelectInput = (option, key) => {
  const sortingFilter = localStorage.getItem(STORAGE_KEYS.sorting);
  const categoryFilter = localStorage.getItem(STORAGE_KEYS.category);

  if (sortingFilter === key || categoryFilter === key) {
    option.setAttribute('selected', 'selected');
  }
};

const generateOption = (key, value) => {
  const option = document.createElement('option');
  option.setAttribute('value', key);
  option.innerText = value;
  return option;
};

// TODO: createElement 재사용할 수 있게 구현
const generateSelectField = ({ id, name, options }) => {
  const select = document.createElement('select');
  select.setAttribute('id', id);
  select.setAttribute('name', name);
  select.classList.add('restaurant-filter');

  Object.entries(options).forEach(([key, value]) => {
    const option = generateOption(key, value);
    initSelectInput(option, key);
    select.appendChild(option);
  });

  return select;
};

export default generateSelectField;
