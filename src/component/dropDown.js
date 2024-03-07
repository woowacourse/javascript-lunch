import { $ } from '../utils/selector.js';

function createDropDown({ id, callback, options, className, required }) {
  const dropdown = render({ options, id, className, required });

  if (!callback) return dropdown;

  dropdown.addEventListener('change', () => {
    const selectedOption = dropdown.value; // 선택된 옵션 값
    callback(selectedOption); // 콜백 함수 호출
  });

  return dropdown;
}

// REFACTOR: createElement로 수정해야한다.
function render({ options, id, className, required }) {
  const select = document.createElement('select');
  select.id = id;
  select.className = className;
  select.required = required;

  options.forEach((optionValue) => {
    const option = document.createElement('option');
    option.value = optionValue;
    option.textContent = optionValue;
    select.appendChild(option);
  });

  return select;
}

export { createDropDown };
