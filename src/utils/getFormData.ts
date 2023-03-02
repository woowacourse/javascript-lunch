type ConvertedDataType = {
  [key: string]: string;
};

const getFormData = (formElement: HTMLFormElement) => {
  console.log(formElement);
  const formData = new FormData(formElement);
  const convertedData: ConvertedDataType = {};

  formData.forEach((value, key) => {
    convertedData[key] = value.toString();
  });

  return convertedData;
};

export default getFormData;
