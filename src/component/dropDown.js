function createDropDown({ id, callback, options, className, required, cover }) {
  const dropdown = render({ options, id, className, required, cover });

  if (!callback) return dropdown;

  dropdown.addEventListener('change', (event) => {
    const $previouslySelectedOption =
      dropdown.querySelector('.selected__option');
    $previouslySelectedOption.classList.remove('selected__option');

    const selectedOptionText = dropdown.value;
    const $selectedOption = event.target.querySelector(
      `[value=${selectedOptionText}]`
    );
    $selectedOption.classList.add('selected__option');

    callback(selectedOptionText); // 콜백 함수 호출
  });

  return dropdown;
}

// REFACTOR: createElement로 수정해야한다.
function render({ options, id, className, required, cover }) {
  const select = document.createElement('select');
  select.id = id;
  select.className = className;
  select.required = required;

  if (cover) {
    const option = document.createElement('option');
    option.value = '';

    option.textContent = cover;
    select.appendChild(option);
  }

  createSelectOptions(select, options);
  return select;
}

function createSelectOptions(select, options) {
  options.forEach((optionValue, i) => {
    const option = document.createElement('option');

    if (i === 0) option.classList.add('selected__option');

    option.value = optionValue;
    option.textContent = optionValue;
    select.appendChild(option);
  });
}

export { createDropDown };
