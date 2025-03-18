import { RemoveErrorType, SetErrorType } from "../types/util/ErrorServiceType";

export function setError({ name }: SetErrorType) {
  document.querySelector(`[name=${name}]`)?.classList.add("error");
}

export function removeError({ name }: RemoveErrorType) {
  document.querySelector(`[name=${name}]`)?.classList.remove("error");
}

export function resetError() {
  ["category", "name", "distance", "description", "link"].forEach((key) => {
    return removeError({ name: key });
  });
}
