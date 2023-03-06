import IRestaurant from "../type/IRestaurant";

const Validator = {
  checkBlankWord(input: string) {
    const regExp = /\s/g;
    if (!input.replace(regExp, "").length) {
      throw new Error("공백만으로 이루어진 입력이 있습니다.");
    }
  },
  checkUrl(input: string) {
    const regExp = /^http[s]?:\/\//i;
    if (input.length > 0 && !regExp.test(input)) {
      throw new Error(
        "링크 주소의 형식이 http:// 또는 https:// 으로 시작해야 합니다."
      );
    }
  },
  checkRestaurant(restaurantForm: IRestaurant) {
    this.checkBlankWord(restaurantForm.name);
    this.checkBlankWord(restaurantForm.description as string);
    this.checkUrl(restaurantForm.link as string);
  },
};
export default Validator;
