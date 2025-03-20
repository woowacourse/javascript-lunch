const select = ({ id, name, options, className }) => {
  const select = document.createElement("select");
  select.id = id;
  select.name = name;
  select.className = className;

  options.forEach(({ value, label }) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = label;
    select.appendChild(option);
  });

  return select;
};

export default select;
