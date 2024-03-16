function createDropDown({
  id,
  callback,
  options,
  className,
  required,
  noneSelcteddefaultMessage,
}) {
  const dropdown = render({
    options,
    id,
    className,
    required,
    noneSelcteddefaultMessage,
  });

  if (!callback) return dropdown;

  dropdown.addEventListener('change', () => {
    const selectedOption = dropdown.value;
    callback(selectedOption);
  });

  return dropdown;
}

function render({
  options,
  id,
  className,
  required,
  noneSelcteddefaultMessage,
}) {
  const select = document.createElement('select');
  select.id = id;
  select.className = className;
  select.required = required;

  if (!!noneSelcteddefaultMessage) {
    const option = document.createElement('option');
    option.value = '';
    option.textContent = noneSelcteddefaultMessage;
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
