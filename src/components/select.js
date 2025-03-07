const $select = (selectInfo) => {
    const select = document.createElement("select");
    Object.assign(select, selectInfo.attribute);

    Object.keys(selectInfo.options).forEach((selectName) => {
        const option = document.createElement("option");
        option.value = selectInfo.options[selectName];
        option.textContent = selectName;
        select.appendChild(option);
    });
  
    return select;
  };
  
  export default $select;