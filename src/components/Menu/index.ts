const Menu = {
  template() {
    return `
      <section class="menu-container">
        <div id="all-restaurant" class="menu-item">모든 음식점</div>
        <div id="favorite-restaurant" class="menu-item">자주 가는 음식점</div>
      </section>`;
  },
  setEvent() {
    const allRestaurant = document.querySelector('#all-restaurant') as HTMLDivElement;
    const favoriteRestaurant = document.querySelector('#favorite-restaurant') as HTMLDivElement;
    allRestaurant?.addEventListener('click', () => {
      this.addClassBy(allRestaurant);
    });
    favoriteRestaurant?.addEventListener('click', () => {
      this.addClassBy(favoriteRestaurant);
    });
  },
  addClassBy(clickedElement: HTMLElement) {
    const menuItems = document.querySelectorAll('.menu-item');

    menuItems?.forEach((item) => {
      if (item === clickedElement) {
        item.classList.add('menu-item-clicked');
      } else {
        item.classList.remove('menu-item-clicked');
      }
    });
  },
};

export default Menu;
