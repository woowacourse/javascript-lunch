import { Restaurant } from "../entities";
import throwError from "./throwError.js";

const urlRegex = /^(https?:\/\/)?([\w\d.-]+)\.([a-z.]{2,6})(\/[\w\d.-]*)*\/?$/i;

const validateLink = (link: Restaurant["link"]) => {
  throwError({
    condition: !link || !urlRegex.test(link),
    message: `잘못된 링크 형식입니다.`,
  });
};

export default validateLink;
