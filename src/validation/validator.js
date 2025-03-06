export const validateInputValue = (rawInput) => {
  const input = rawInput.trim();
  if (input === "") {
    throw new Error("이름은 공백일 수 없습니다.");
  }

  if (input.length > 30) {
    throw new Error("이름은 30자를 넘길 수 없습니다.");
  }
};
