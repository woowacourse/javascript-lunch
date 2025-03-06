let state = {
  category: false,
  name: false,
  distance: false,
  description: false,
  link: false,
};

export function getState(name) {
  return state[name];
}

export function setState(name) {
  state = { ...state, [name]: !state[name] };
}

export function renderError(isError) {
  return isError ? "error" : "";
}

