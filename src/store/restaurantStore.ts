import { Restaurant } from "../../types/Restaurant.ts";
import { loadRestaurants, saveRestaurants } from "../utils/localStorage.ts";

type Listener = (restaurants: Restaurant[]) => void;


const defaultRestaurants: Restaurant[] = [
  {
    id: "1",
    name: "친친",
    category: "chinese",
    categoryName: "중식",
    distance: 5,
    description:
      "Since 2004 편리한 교통과 주차, 그리고 관록만큼 깊은 맛과 정성으로 정통 중식의 세계를 펼쳐갑니다",
    favorites: false,
  },
  {
    id: "2",
    category: "korean",
    categoryName: "한식",
    name: "피양콩할마니",
    distance: 10,
    description:
      "평양 출신의 할머니가 수십 년간 운영해온 비지 전문점 피양콩 할마니. 두부를 빼지 않은 되비지를 맛볼 수 있는 곳으로, '피양'은 평안도 사투리로 '평양'을 의미한다. 딸과 함께 운영하는 이곳에선 맷돌로 직접 간 콩만을 사용하며, 일체의 조미료를 넣지 않은 건강식을 선보인다. 콩비지와 피양 만두가 이곳의 대표 메뉴지만, 할머니가 옛날 방식을 고수하며 만들어내는 비지전골 또한 이 집의 역사를 느낄 수 있는 특별한 메뉴다. 반찬은 손님들이 먹고 싶은 만큼 덜어 먹을 수 있게 준비돼 있다.",
    favorites: false,
  },
  {
    id: "3",
    category: "japanese",
    categoryName: "일식",
    name: "잇쇼우",
    distance: 10,
    description:
      "잇쇼우는 정통 자가제면 사누끼 우동이 대표메뉴입니다. 기술은 정성을 이길 수 없다는 신념으로 모든 음식에 최선을 다하는 잇쇼우는 고객 한분 한분께 최선을 다하겠습니다",
    favorites: false,
  },
  {
    id: "4",
    category: "western",
    categoryName: "양식",
    name: "이태리키친",
    distance: 20,
    description: "늘 변화를 추구하는 이태리키친입니다.",
    favorites: false,
  },
  {
    id: "5",
    category: "asian",
    categoryName: "아시안",
    name: "호아빈 삼성점",
    distance: 15,
    description: "푸짐한 양에 국물이 일품인 쌀국수",
    favorites: false,
  },
  {
    id: "6",
    category: "etc",
    categoryName: "기타",
    name: "도스타코스 선릉점",
    distance: 5,
    description: "멕시칸 캐주얼 그릴",
    favorites: false,
  },
];

class RestaurantStore {
  private restaurants: Restaurant[] = [];
  private listeners: Listener[] = [];
  private initialized: boolean = false;

  constructor() {
    // 생성자에서는 데이터 초기화를 하지 않음
    this.restaurants = [];
    this.listeners = [];
  }

  
  initialize(): void {
    if (this.initialized) return;
    
    // localStorage에서 데이터 로드 시도
    const storedRestaurants = loadRestaurants();
    
    // 저장된 데이터가 없으면 기본값 사용
    this.restaurants = storedRestaurants || [...defaultRestaurants];
    this.initialized = true;
  }

  getRestaurants(): Restaurant[] {
    // 초기화 확인
    if (!this.initialized) {
      this.initialize();
    }
    return [...this.restaurants];
  }

  
  getById(id: string): Restaurant | undefined {
    // 초기화 확인
    if (!this.initialized) {
      this.initialize();
    }
    return this.restaurants.find((restaurant) => restaurant.id === id);
  }

 
  addRestaurant(restaurant: Restaurant): void {
    // 초기화 확인
    if (!this.initialized) {
      this.initialize();
    }
    this.restaurants.push(restaurant);
    this._persist();
    this._notifyListeners();
  }


  updateRestaurant(id: string, updates: Partial<Restaurant>): boolean {
    // 초기화 확인
    if (!this.initialized) {
      this.initialize();
    }
    
    const index = this.restaurants.findIndex((r) => r.id === id);
    if (index === -1) return false;

    this.restaurants[index] = { ...this.restaurants[index], ...updates };
    this._persist();
    this._notifyListeners();
    return true;
  }


  deleteRestaurant(id: string): boolean {
    // 초기화 확인
    if (!this.initialized) {
      this.initialize();
    }
    
    const initialLength = this.restaurants.length;
    this.restaurants = this.restaurants.filter(
      (restaurant) => restaurant.id !== id
    );

    if (this.restaurants.length !== initialLength) {
      this._persist();
      this._notifyListeners();
      return true;
    }
    return false;
  }

  subscribe(listener: Listener): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private _persist(): void {
    saveRestaurants(this.restaurants);
  }

  private _notifyListeners(): void {
    this.listeners.forEach((listener) => listener(this.restaurants));
  }
}


export const restaurantStore = new RestaurantStore();