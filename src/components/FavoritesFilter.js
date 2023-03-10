class FavoritesFilter {
  constructor() {
    this.$target = document.querySelector('main');
    this.render();
  }

  template() {
    return `
      <section class="restaurant-favorites-filter-contianer">
        <div class="button-container favorites-filter" value="all">
          <button type="button" class="filter text-caption all-restaurants clicked">모든 음식점</button>
          <button type="button" class="filter text-caption favorites-restaurants">자주 가는 음식점</button>
        </div>
      </section>
      `;
  }

  render() {
    if (!document.querySelector('.restaurant-favorites-filter-container')) {
      this.$target.insertAdjacentHTML('afterbegin', this.template());
    }
  }

  setEvent(renderRestaurantsList) {
    const $filters = document.querySelector('.restaurant-filter-container');

    $filters.addEventListener('change', e => {
      e.preventDefault();
      renderRestaurantsList();
    });
  }

  setClickAllButtonEvent(OnClickButton, OnClickButton2) {
    const $allButton = document.querySelector('.favorites-filter .all-restaurants');

    $allButton.addEventListener('click', e => {
      e.preventDefault();

      document.querySelector('.favorites-filter').setAttribute('value', 'all');
      $allButton.classList.add('clicked');
      const $favoritesButton = document.querySelector('.favorites-filter .favorites-restaurants');
      $favoritesButton.classList.remove('clicked');

      OnClickButton();
      OnClickButton2();
    });
  }

  setClickFavoritesButtonEvent(OnClickButton, OnClickButton2) {
    const $favoritesButton = document.querySelector('.favorites-filter .favorites-restaurants');

    $favoritesButton.addEventListener('click', e => {
      e.preventDefault();

      document.querySelector('.favorites-filter').setAttribute('value', 'favorites');
      $favoritesButton.classList.add('clicked');
      const $allButton = document.querySelector('.favorites-filter .all-restaurants');
      $allButton.classList.remove('clicked');

      OnClickButton();
      OnClickButton2();
    });
  }
}

export default FavoritesFilter;
