export const arrayElementToObject = function arrayElementToValueTextObject(
  array
) {
  return array.map((element) => {
    return { value: element, text: element };
  });
};
