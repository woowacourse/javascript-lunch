export const getStoreData = (store, key) => {
  return JSON.parse(store.getItem(key));
};
