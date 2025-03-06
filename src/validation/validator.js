export const validateNameInput = (rawInput) => {
  const input = rawInput.trim();
  if (input === "") {
    throw new Error("이름은 공백일 수 없습니다.");
  }

  if (input.length > 30) {
    throw new Error("이름은 30자를 넘길 수 없습니다.");
  }
};

export const validateDescriptiontInput = (rawInput) => {
  const input = rawInput.trim();
  if (input === "") {
    throw new Error("설명은 공백일 수 없습니다.");
  }

  if (input.length > 1500) {
    throw new Error("설명은 1500자를 넘길 수 없습니다.");
  }
};
