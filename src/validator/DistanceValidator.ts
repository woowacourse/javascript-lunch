import Condition from '../constants/Condition';

const { DISTANCE } = Condition;

const DistanceValidator = {
  empty(distance: number) {
    if (distance === undefined) {
      throw new Error('입력값이 비어있습니다.');
    }
  },

  exist(distance: number) {
    const distanceValues = Object.values(DISTANCE).map(Number);
    if (!distanceValues.includes(distance)) {
      throw new Error('당신 저를 어디까지 보낼 생각인거죠?');
    }
  },
};

export default DistanceValidator;
