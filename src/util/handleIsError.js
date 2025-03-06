let state = {
  category: false,
  name: false,
  distance: false,
  description: false,
  link: false,
};

export function setState(name) {
  state = { ...state, [name]: !state[name] };
}

export function setError(name) {
  document.querySelector(`[name=${name}]`).classList.add("error");
}

export function removeError(name) {
  document.querySelector(`[name=${name}]`).classList.remove("error");
}
