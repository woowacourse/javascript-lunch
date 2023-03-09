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

  setAllRestaurantsButtonClickEvent(OnClickButton, OnClickButton2) {
    const $allRestaurantsButton = document.querySelector('.favorites-filter .all-restaurants');

    $allRestaurantsButton.addEventListener('click', e => {
      e.preventDefault();

      document.querySelector('.favorites-filter').setAttribute('value', 'all');
      $allRestaurantsButton.classList.add('clicked');
      const $favoritesRestaurantsButton = document.querySelector('.favorites-filter .favorites-restaurants');
      $favoritesRestaurantsButton.classList.remove('clicked');

      OnClickButton();
      OnClickButton2();
    });
  }

  setFavoritesRestaurantsButtonClickEvent(OnClickButton, OnClickButton2) {
    const $favoritesRestaurantsButton = document.querySelector('.favorites-filter .favorites-restaurants');

    $favoritesRestaurantsButton.addEventListener('click', e => {
      e.preventDefault();

      document.querySelector('.favorites-filter').setAttribute('value', 'favorites');
      $favoritesRestaurantsButton.classList.add('clicked');
      const $allRestaurantsButton = document.querySelector('.favorites-filter .all-restaurants');
      $allRestaurantsButton.classList.remove('clicked');

      OnClickButton();
      OnClickButton2();
    });
  }
}

export default FavoritesFilter;
