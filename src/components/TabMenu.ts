class TabMenu {
  $target: HTMLElement;
  private allRestaurantButton: HTMLDivElement;
  private likedRestaurantButton: HTMLDivElement;

  constructor($target: HTMLElement) {
    this.$target = $target;
    this.allRestaurantButton = document.querySelector<HTMLDivElement>('#allRestaurantButton')!;
    this.likedRestaurantButton = document.querySelector<HTMLDivElement>('#likedRestaurantButton')!;
    this.render();
  }

  private render() {
    const $fragment = document.createDocumentFragment();

    const $allRestaurantButton = document.createElement('div');
    $allRestaurantButton.innerHTML = `모든 음식점`;
    $allRestaurantButton.id = 'allRestaurantButton';
    $allRestaurantButton.classList.add('all-restaurant');
    $allRestaurantButton.classList.add('selected');
    $fragment.appendChild($allRestaurantButton);

    const $likedRestaurantButton = document.createElement('div');
    $likedRestaurantButton.innerHTML = `자주 가는 음식점`;
    $likedRestaurantButton.id = 'likedRestaurantButton';
    $likedRestaurantButton.classList.add('all-restaurant');
    $fragment.appendChild($likedRestaurantButton);

    this.$target.appendChild($fragment);
  }
}

export default TabMenu;
