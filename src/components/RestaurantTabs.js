export default function RestaurantTabs(container, activeTab = "all") {
  // 탭 HTML 생성
  const tabsHTML = `
    <div class="restaurant-tabs">
      <button 
        class="tab-button ${activeTab === "all" ? "tab-button--active" : ""}" 
        data-tab="all">
        모든 음식점
      </button>
      <button 
        class="tab-button ${activeTab === "favorites" ? "tab-button--active" : ""}" 
        data-tab="favorites">
        자주 가는 음식점
      </button>
    </div>
  `;

  container.innerHTML += tabsHTML;

  // 탭 버튼 요소 반환 (이벤트 리스너 추가를 위해)
  return container.querySelector(".restaurant-tabs");
}
