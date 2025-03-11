export const isNotSelected = (input) => {
  if (input === '선택해주세요') return true;
};

export const isBlank = (name) => {
  if (name.trim() === '') return true;
};

export const isInvalidLength = (name, length) => {
  if (name.length > length) return true;
};
