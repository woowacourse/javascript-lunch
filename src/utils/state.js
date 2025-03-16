// utils/state.js
import { initialRestaurants } from "../data/initialRestaurants.ts";

// 로컬 스토리지 키 상수
const STORAGE_KEYS = {
  RESTAURANTS: "restaurant_app_restaurants",
  FILTERS: "restaurant_app_filters",
};

/**
 * 애플리케이션 상태를 관리하는 클래스
 */
class AppState {
  constructor() {
    // 로컬 스토리지에서 레스토랑 목록 불러오기
    const savedRestaurants = this.loadFromLocalStorage(
      STORAGE_KEYS.RESTAURANTS,
    );

    // 레스토랑 목록 초기화 (저장된 데이터가 있으면 사용, 없으면 초기 데이터 사용)
    this.restaurants = savedRestaurants || [...initialRestaurants];

    // 로컬 스토리지에서 필터 설정 불러오기
    const savedFilters = this.loadFromLocalStorage(STORAGE_KEYS.FILTERS);

    // 현재 필터 설정 (저장된 데이터가 있으면 사용, 없으면 기본값 사용)
    this.filters = savedFilters || {
      category: "all",
      sorting: "default",
    };

    // 구독자 목록 (상태 변경 시 알림 받을 콜백 함수들)
    this.subscribers = [];
  }

  /**
   * 현재 필터를 적용한 레스토랑 목록을 반환합니다.
   * @returns {Array} 필터링된 레스토랑 목록
   */
  getFilteredRestaurants() {
    let filteredList = [...this.restaurants];

    // 카테고리 필터 적용
    if (this.filters.category && this.filters.category !== "all") {
      filteredList = filteredList.filter(
        (restaurant) => restaurant.category === this.filters.category,
      );
    }

    // 정렬 적용
    if (this.filters.sorting) {
      switch (this.filters.sorting) {
        case "distance":
          filteredList.sort((a, b) => {
            const distanceA = parseInt(a.distance);
            const distanceB = parseInt(b.distance);
            return distanceA - distanceB;
          });
          break;
        case "name":
          filteredList.sort((a, b) => a.name.localeCompare(b.name));
          break;
        // 추가 정렬 옵션은 여기에 구현
      }
    }

    return filteredList;
  }

  /**
   * 새 레스토랑을 추가합니다.
   * @param {Object} restaurant - 추가할 레스토랑 데이터
   */
  addRestaurant(restaurant) {
    // 레스토랑 객체 포맷 변환
    const newRestaurant = {
      id: Date.now(), // 임시 ID 생성
      category: restaurant.categoryCode,
      categoryName: restaurant.categoryValue,
      name: restaurant.nameValue,
      distance: restaurant.distanceValue,
      description: restaurant.descriptionValue,
      link: restaurant.linkValue || "",
    };

    this.restaurants.push(newRestaurant);
    this.notifySubscribers();
  }

  /**
   * 필터를 업데이트합니다.
   * @param {Object} newFilters - 새 필터 설정
   */
  updateFilters(newFilters) {
    this.filters = { ...this.filters, ...newFilters };
    this.notifySubscribers();
  }

  /**
   * 필터를 초기 상태로 재설정합니다.
   */
  resetFilters() {
    this.filters = {
      category: "all",
      sorting: "default",
    };
    this.notifySubscribers();
  }

  /**
   * 상태 변경 구독 함수를 등록합니다.
   * @param {Function} callback - 상태 변경 시 호출될 콜백 함수
   * @returns {Function} 구독 취소 함수
   */
  subscribe(callback) {
    this.subscribers.push(callback);

    // 구독 취소 함수 반환
    return () => {
      this.subscribers = this.subscribers.filter((cb) => cb !== callback);
    };
  }

  /**
   * 모든 구독자에게 상태 변경을 알립니다.
   */
  notifySubscribers() {
    // 로컬 스토리지에 현재 상태 저장
    this.saveToLocalStorage(STORAGE_KEYS.RESTAURANTS, this.restaurants);
    this.saveToLocalStorage(STORAGE_KEYS.FILTERS, this.filters);

    const filteredRestaurants = this.getFilteredRestaurants();
    this.subscribers.forEach((callback) =>
      callback(filteredRestaurants, this.filters),
    );
  }

  /**
   * 로컬 스토리지에서 데이터를 불러옵니다.
   * @param {string} key - 로컬 스토리지 키
   * @returns {Object|Array|null} 저장된 데이터 또는 null
   */
  loadFromLocalStorage(key) {
    try {
      const serializedData = localStorage.getItem(key);
      if (serializedData === null) {
        return null;
      }
      return JSON.parse(serializedData);
    } catch (error) {
      console.error(`로컬 스토리지에서 데이터 불러오기 오류 (${key}):`, error);
      return null;
    }
  }

  /**
   * 로컬 스토리지에 데이터를 저장합니다.
   * @param {string} key - 로컬 스토리지 키
   * @param {Object|Array} data - 저장할 데이터
   * @returns {boolean} 저장 성공 여부
   */
  saveToLocalStorage(key, data) {
    try {
      const serializedData = JSON.stringify(data);
      localStorage.setItem(key, serializedData);
      return true;
    } catch (error) {
      console.error(`로컬 스토리지에 데이터 저장 오류 (${key}):`, error);
      return false;
    }
  }

  /**
   * 로컬 스토리지의 데이터를 초기화합니다.
   * @returns {boolean} 초기화 성공 여부
   */
  clearLocalStorage() {
    try {
      localStorage.removeItem(STORAGE_KEYS.RESTAURANTS);
      localStorage.removeItem(STORAGE_KEYS.FILTERS);

      // 상태 초기화
      this.restaurants = [...initialRestaurants];
      this.filters = {
        category: "all",
        sorting: "default",
      };

      this.notifySubscribers();
      return true;
    } catch (error) {
      console.error("로컬 스토리지 초기화 오류:", error);
      return false;
    }
  }
}

// 싱글톤 인스턴스 생성 및 내보내기
export const appState = new AppState();
