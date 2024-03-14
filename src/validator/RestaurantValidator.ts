import RestaurantService from '../service/RestaurantService';
import { ILocation } from '../interface/interface';

const RestaurantValidator = {
  validateRestaurantName(userInput: string) {
    const isNameLengthOutOfRange = userInput.length < 1 || userInput.length > 20;
    if (isNameLengthOutOfRange) {
      throw new Error('1글자 이상 20글자 이하로 입력해주세요.');
    }

    const isNameBlank = [...new Set(userInput)].join('') === ' ';
    if (isNameBlank) {
      throw new Error('공백을 제외하고 1글자 이상 입력해주세요.');
    }
  },

  validateRestaurantCategory(inputData: ILocation) {
    if (!inputData.category) {
      throw new Error('값을 선택해주세요.');
    }
  },

  validateRestaurantMinutesWalk(inputData: Object) {
    const inputLocationData = inputData as ILocation;
    if (!inputLocationData.minutesWalk) {
      throw new Error('값을 선택해주세요.');
    }
  },

  validateRestaurantOverlapping(inputData: Object) {
    const inputLocationData = inputData as ILocation;
    //TODO: 코드 완성하기
  },
};

export default RestaurantValidator;
