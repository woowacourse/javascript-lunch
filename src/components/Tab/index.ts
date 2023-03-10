import $template from './index.html';

class Tab extends HTMLElement {
  connectedCallback() {
    this.render();
    const $allRestaurant = this.querySelector('#all-restaurant')!;
    const $favoriteRestaurant = this.querySelector('#favorite-restaurant')!;

    // 모든 음식점
    $allRestaurant.addEventListener('click', () => {});

    // 자주 가는 음식점
    $favoriteRestaurant.addEventListener('click', () => {});
  }

  render() {
    this.innerHTML = $template;
  }
}

export default Tab;
