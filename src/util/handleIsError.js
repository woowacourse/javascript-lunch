let state = {
  category: false,
  name: false,
  distance: false,
  description: false,
  link: false,
};

export function setError(name) {
  document.querySelector(`[name=${name}]`).classList.add("error");
}

export function removeError(name) {
  document.querySelector(`[name=${name}]`).classList.remove("error");
}

export function resetError() {
  Object.keys(state).forEach((key) => {
    return removeError(key);
  });
}
