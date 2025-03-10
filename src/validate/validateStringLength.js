const validateStringLength = (string, { minLength, maxLength }) => {
  if (string.length <= maxLength && string.length >= minLength) return;

  if (minLength === 0) throw new Error(`${maxLength}자 이하를 작성해주세요.`);

  throw new Error(`${minLength}자 이상 ${maxLength}자 이하를 작성해주세요.`);
};

export default validateStringLength;
