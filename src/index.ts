import RestaurantList from "./components/RestaurantList.js";
import RestaurantTabs from "./components/RestaurantTabs.js";
import DetailModal from "./components/DetailModal";
import { setupFilterEventListeners } from "./handlers/filterHandler";

class App {
  private restaurantList: RestaurantList;
  private restaurantTabs: RestaurantTabs;
  private detailModal: DetailModal;

  constructor() {
    // 컴포넌트 초기화
    this.restaurantList = new RestaurantList();
    this.restaurantTabs = new RestaurantTabs();
    this.detailModal = new DetailModal();

    // 필터 이벤트 리스너 설정
    setupFilterEventListeners();
  }
}

// 앱 시작
new App(); 