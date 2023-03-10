class TabMenu {
  template() {
    return `
      <div id="allRestaurantButton" class="all-restaurant selected" >모든 음식점</div> 
      <div id="likedRestaurantButton" class="liked-restaurant" >자주 가는 음식점</div>
    `;
  }

  allRestuarantClicked() {
    const event = new CustomEvent('allRestaurantClicked');
    document.dispatchEvent(event);
  }

  likedRestaurantClicked() {
    const event = new CustomEvent('likedRestaurantClicked');
    document.dispatchEvent(event);
  }

  bindTabButton(): void {
    const allRestaurantButton = document.querySelector('#allRestaurantButton');
    if (allRestaurantButton) {
      allRestaurantButton.addEventListener('click', this.allRestuarantClicked);
    }

    const likedRestaurantButton = document.querySelector('#likedRestaurantButton');
    if (likedRestaurantButton) {
      likedRestaurantButton.addEventListener('click', this.likedRestaurantClicked);
    }
  }

  update(allButton: Element, likedButton: Element, navTab: string) {
    const navigationElement = document.querySelector('.tabMenu-container');
    const filterContainer = document.querySelector('.restaurant-filter-container') as HTMLElement;
    //선택된 탭 빨간 줄 표시 기능
    if (navigationElement) {
      navigationElement.innerHTML = '';
      navigationElement.appendChild(allButton);
      navigationElement.appendChild(likedButton);
    }
    //자주가는 식당 선택 시 셀렉트 박스 삭제
    if (navTab === 'liked') {
      filterContainer!.style.display = 'none';
    }
  }
}
export default TabMenu;
