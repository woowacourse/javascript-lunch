import { GetInputType } from "../../types/domain/GetInputType";

export function getInput({ name }: GetInputType) {
  const value = (
    document.querySelector(`.form-item [name=${name}]`) as HTMLSelectElement
  )?.value;
  return value;
}
