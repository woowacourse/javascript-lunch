import SIZE from '../../../src/constant/size';

export const TEST_CONSTANT = {
  CATEGORY: '한식',
  NAME: '테스트 식당',
  WRONG_NAME: 'A'.repeat(SIZE.MAX_LENGTH_OF_NAME + 1),
  DISTANCE: '5분 내',
  DESCRIPTION: '테스트 식당에 대한 설명 입니다.',
  WRONG_DESCRIPTION: 'A'.repeat(SIZE.MAX_LENGTH_OF_DESCRIPTION + 1),
  LINK: 'https://test.com',
};
