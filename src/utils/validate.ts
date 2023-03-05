export const validateUrl = (url: string): string => {
  const urlRegex = /^https?:\/\/([\S]{3,})/i;
  if (!urlRegex.test(url || "") && url !== "") {
    throw new Error("올바른 링크를 입력해주세요");
  }
  return url || "";
};
