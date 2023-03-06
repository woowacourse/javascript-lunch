export const inputValidator = {
  validateName: (nameInput: string) => {
    if (nameInput.trim().length == 0) {
      throw new Error("[ERROR] 이름을 입력해주세요.");
    }
    return nameInput;
  },
};
