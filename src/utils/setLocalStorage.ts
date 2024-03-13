const setLocalStorage = (key: string, item: any) => {
  const stringifiedItem = JSON.stringify(item);
  localStorage.setItem("restaurants", item);
};

export default setLocalStorage;
