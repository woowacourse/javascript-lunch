const getFormData = (formElement: HTMLFormElement) => {
  const formData = new FormData(formElement);

  const convertedData: Record<string, FormDataEntryValue> = [
    ...formData.entries(),
  ].reduce(
    (totalData, [key, value]) => ({
      ...totalData,
      [key]: value.toString(),
    }),
    {}
  );

  return convertedData;
};

export default getFormData;
