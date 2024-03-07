type Category = '전체' | '한식' | '중식' | '일식' | '아시안' | '양식' | '기타';
type Minutes = 5 | 10 | 15 | 20 | 30;

interface Restaurant {
  category: Category;
  name: string;
  walkingTimeFromCampus: Minutes;
  description?: string;
  referenceLink?: string;
}
