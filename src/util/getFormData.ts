const getFormData = (formElement: HTMLFormElement) => {
  const formData = new FormData(formElement);

  const convertedData: Record<string, FormDataEntryValue> = Object.fromEntries(
    formData.entries()
  );

  return convertedData;
};

export default getFormData;
