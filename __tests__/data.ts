const restaurantA = {
  category: '한식' as const,
  name: '파슬리네 김치찌개',
  distance: 30 as const,
};

const restaurantB = {
  category: '중식' as const,
  name: '파슬리네 짜장면',
  distance: 30 as const,
};

const restaurantC = {
  category: '일식' as const,
  name: '파슬리네 회전초밥',
  distance: 20 as const,
};

const restaurantD = {
  category: '아시안' as const,
  name: '썬데이네 쌀국수',
  distance: 15 as const,
};

const restaurantE = {
  category: '양식' as const,
  name: '썬데이네 파스타',
  distance: 10 as const,
};

const restaurantF = {
  category: '기타' as const,
  name: '썬데이네 반찬가게',
  distance: 5 as const,
};

export default { restaurantA, restaurantB, restaurantC, restaurantD, restaurantE, restaurantF };
