type Category = "한식" | "중식" | "일식" | "아시안" | "양식" | "기타";

type Distance = 5 | 10 | 15 | 20 | 30;

interface Restaurant {
  name: string;
  categoty: Category;
  distance: Distance;

  description: string | null;
  link: string | null;
}

export default Restaurant;
