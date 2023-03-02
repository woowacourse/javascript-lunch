export const getFormData = (event: Event) => {
  const formData = new FormData(event.target as HTMLFormElement);

  return Object.fromEntries(formData);
};
