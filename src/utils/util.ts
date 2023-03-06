export interface ISelectOptionProps {
  value: string;
  text: string;
}

export const arrayElementToObject = function arrayElementToValueTextObject(
  array: string[]
): ISelectOptionProps[] {
  return array.map((element) => {
    return { value: element, text: element };
  });
};
