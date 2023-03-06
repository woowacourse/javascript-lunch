import IRestaurant from "../type/IRestaurant";

const Validator = {
  checkBlankWord(input: string) {
    const regExp = /\s/g;
    if (!input.replace(regExp, "").length) {
      throw new Error("공백만으로 이루어진 입력이 있습니다.");
    }
  },
  checkRestaurant(restaurantForm: IRestaurant) {
    console.log(restaurantForm);
    this.checkBlankWord(restaurantForm.name);
    this.checkBlankWord(restaurantForm.description as string);
  },
};
export default Validator;
