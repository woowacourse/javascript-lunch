const LocalStorage = {
  setItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },

  getItem(key) {
    console.log(JSON.parse(window.localStorage.getItem(key)));
    return JSON.parse(window.localStorage.getItem(key));
  },
};

export default LocalStorage;
