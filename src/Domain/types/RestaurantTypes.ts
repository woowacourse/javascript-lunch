/**
 * 레스토랑 데이터 인터페이스
 * 레스토랑 관련 데이터 구조를 정의
 */
export interface RestaurantData {
  name: string; // 레스토랑 이름 (필수)
  distance: string; // 거리(도보 이동 시간) (필수)
  category: string; // 카테고리 (필수)
  description?: string; // 설명 (선택)
  link?: string; // 참조 링크 (선택)
}

/**
 * 폼에서 입력받는 레스토랑 데이터 타입
 * RestaurantData와 동일한 구조를 가지므로 타입 별칭으로 정의
 */
export type RestaurantFormData = RestaurantData;
