export default class TabMenu {
  public template() {
    return `
      <div id="allRestaurantButton" class="all-restaurant selected" >모든 음식점</div> 
      <div id="likedRestaurantButton" class="liked-restaurant" >자주 가는 음식점</div>
    `;
  }

  public bindTabButton(): void {
    const allRestaurantButton = document.querySelector('#allRestaurantButton');
    if (allRestaurantButton) {
      allRestaurantButton.addEventListener('click', this.allRestuarantClicked);
    }

    const likedRestaurantButton = document.querySelector('#likedRestaurantButton');
    if (likedRestaurantButton) {
      likedRestaurantButton.addEventListener('click', this.likedRestaurantClicked);
    }
  }

  public update(allButton: Element, likedButton: Element, navTab: string) {
    const navigationElement = document.querySelector('.tabMenu-container');
    const filterContainer = document.querySelector('.restaurant-filter-container') as HTMLElement;

    const showSelectedTab = () => {
      navigationElement!.innerHTML = '';
      navigationElement!.appendChild(allButton);
      navigationElement!.appendChild(likedButton);
    };

    const hideFilterContainer = () => {
      filterContainer!.style.display = 'none';
    };

    if (navigationElement) {
      showSelectedTab();
    }

    if (navTab === 'liked') {
      hideFilterContainer();
    }
  }

  private allRestuarantClicked() {
    const event = new CustomEvent('allRestaurantClicked');
    document.dispatchEvent(event);
  }

  private likedRestaurantClicked() {
    const event = new CustomEvent('likedRestaurantClicked');
    document.dispatchEvent(event);
  }
}
