const createLabel = (id, labelText) => {
  const label = document.createElement("label");
  label.setAttribute("for", `${id} text-caption`);
  label.innerHTML = labelText;
  return label;
};

const addOptions = (id, valueList, textList) => {
  const select = document.createElement("select");
  select.setAttribute("id", id);
  valueList.forEach((value, index) => {
    const option = document.createElement("option");
    option.setAttribute("value", value);
    option.innerHTML = textList[index];
    select.appendChild(option);
  });
  return select;
};

const createSelectInput = (id, labelText, valueList, textList) => {
  const root = document.createElement("div");

  root.appendChild(createLabel(id, labelText));
  root.appendChild(addOptions(id, valueList, textList));

  return root;
};

export default createSelectInput;
