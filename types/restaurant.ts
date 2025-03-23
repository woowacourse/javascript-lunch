interface RestaurantType {
  category: "한식" | "중식" | "일식" | "양식" | "아시안" | "기타";
  name: string;
  distance: "5분 내" | "10분 내" | "15분 내" | "20분 내" | "30분 내";
  description?: string;
  link?: string;
  favoriteStar?: boolean;
}

export default RestaurantType;
