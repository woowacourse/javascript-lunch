interface TEST_CONSTANT {
  CATEGORY: string;
  NAME: string;
  WRONG_NAME: string;
  DISTANCE: string;
  DESCRIPTION: string;
  WRONG_DESCRIPTION: string;
  LINK: string;
}

export const TEST_CONSTANT: TEST_CONSTANT = Object.freeze({
  CATEGORY: '한식',
  NAME: '테스트 식당',
  WRONG_NAME: '테스트 식당테스트 식당테스트 식당테스트 식당테스트 식당테스트 식당',
  DISTANCE: '5분 내',
  DESCRIPTION: '테스트 식당에 대한 설명 입니다.',
  WRONG_DESCRIPTION:
    '테스트 식당에 대한 설명 입니다.테스트 식당에 대한 설명 입니다.테스트 식당에 대한 설명 입니다.테스트 식당에 대한 설명 입니다.테스트 식당에 대한 설명 입니다.테스트 식당에 대한 설명 입니다.테스트 식당에 대한 설명 입니다.테스트 식당에 대한 설명 입니다.테스트 식당에 대한 설명 입니다.테스트 식당에 대한 설명 입니다.테스트 식당에 대한 설명 입니다.테스트 식당에 대한 설명 입니다.테스트 식당에 대한 설명 입니다.테스트 식당에 대한 설명 입니다.테스트',
  LINK: 'https://test.com',
});
