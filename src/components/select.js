const selectAttribute = {
    categorySelect: {
      required: true,
      id: "category",
      name: "category",
    },
    distanceSelect: {
    required: true,
      id: "distance",
      name: "distance",
    },
  };

const $select = (selectOptions,selectName) => {
    const select = document.createElement("select");
    Object.assign(select, selectAttribute[selectName]);

    Object.keys(selectOptions).forEach((selectName) => {
        const option = document.createElement("option");
        option.value = selectOptions[selectName];
        option.textContent = selectName;
        select.appendChild(option);
    });
  
    return select;
  };
  
  export default $select;