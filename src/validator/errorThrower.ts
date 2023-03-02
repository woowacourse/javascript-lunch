export const checkRestaurantName = (input: string) => {
  if (/[^가-힣a-zA-Z0-9\s]/.test(input)) {
    throw new Error("에러");
  }
};

export const checkInputLength = (input: string) => {
  if (input.length < 1 || input.length > 15) {
    throw new Error("에러");
  }
};
