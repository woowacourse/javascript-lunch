import { $ } from '../utils/selector.js';

function createDropDown({ id, callback, options, className, required, cover }) {
  const dropdown = render({ options, id, className, required ,cover});

  if (!callback) return dropdown;

  dropdown.addEventListener('change', () => {
    const selectedOption = dropdown.value;
    callback(selectedOption);
  });

  return dropdown;
}

// REFACTOR: createElement로 수정해야한다.
function render({ options, id, className, required,  cover}) {
  const select = document.createElement('select');
  select.id = id;
  select.className = className;
  select.required = required;

  if(!!cover) {
    const option = document.createElement('option');
    option.value = ''
    option.textContent = cover;
    select.appendChild(option);
  }

  createSelectOptions(select, options);
  return select;
}

function createSelectOptions(select, options) {
  options.forEach((optionValue) => {
    const option = document.createElement('option');
    option.value = optionValue;
    option.textContent = optionValue;
    select.appendChild(option);
  });
}

export { createDropDown };
