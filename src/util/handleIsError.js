export function setError(name) {
  document.querySelector(`[name=${name}]`).classList.add("error");
}

export function removeError(name) {
  document.querySelector(`[name=${name}]`).classList.remove("error");
}

export function resetError() {
  ["category", "name", "distance", "description", "link"].forEach((key) => {
    return removeError(key);
  });
}
