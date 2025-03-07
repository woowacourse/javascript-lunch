import toThrowNewError from "./toThrowNewError.js";

const regularUrl =
  /^(https?:\/\/)?([\w\d.-]+)\.([a-z.]{2,6})(\/[\w\d.-]*)*\/?$/i;

const validateLink = (link) => {
  toThrowNewError({
    condition: link !== "" && !regularUrl.test(link),
    message: `잘못된 링크 형식입니다.`,
  });
};

export default validateLink;
