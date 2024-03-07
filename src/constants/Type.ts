import Restaurant from '../domain/Restaurant';

type Category = '한식' | '중식' | '일식' | '양식' | '아시안' | '기타';
type MinutesWalk = 5 | 10 | 15 | 20 | 30;
type SortType = '이름순' | '거리순';
type CompareFunction = (a: Restaurant, b: Restaurant) => number;

export { Category, MinutesWalk, SortType, CompareFunction };
