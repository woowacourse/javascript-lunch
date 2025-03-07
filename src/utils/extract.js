export function extractByKey(list, key) {
  return list.map((item) => item[key]);
}

export function extractFormData(form) {
  const formData = new FormData(form);
  return Object.fromEntries(formData.entries());
}
