export interface RestaurantData {
  name: string; // 레스토랑 이름 (필수)
  distance: string; // 거리(도보 이동 시간) (필수)
  category: string; // 카테고리 (필수)
  description?: string; // 설명 (선택)
  link?: string; // 참조 링크 (선택)
  isFavorite?: boolean; // 즐겨찾기 여부 (선택)
}
