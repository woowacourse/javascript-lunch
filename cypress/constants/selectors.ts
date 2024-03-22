const RESTAURANT_ADD_MODAL = {
  modal: 'dialog#add-restaurant-modal',
  submitAddingRestaurantButton: 'button#submit-adding-restaurant-button',
  cancelAddingRestaurantButton: 'button#cancel-adding-restaurant-button',
  nameInput: '#restaurant-name',
  categoryInput: '#restaurant-category',
  distanceByWalkInput: '#restaurant-distanceByWalk',
  descriptionInput: '#restaurant-description',
  referenceUrlInput: '#restaurant-referenceUrl',
  restaurantList: 'restaurant-list',
};

const FAVORITE_BUTTON = {
  restaurantItem: '.restaurant',
  restaurantList: 'restaurant-list',
  restaurantInfoContainer: '.restaurant__info',
  restaurantDetailContainer: '.restaurant__detail',
  restaurantName: 'h3.restaurant__name',
  favoriteButton: 'button.restaurant__favorite-button',
};

const RESTAURANT_DETAIL_MODAL = {
  restaurantList: 'restaurant-list',
  restaurantInfoContainer: '.restaurant__info',
  modal: 'dialog#restaurant-detail-modal',
  restaurantName: 'h3.restaurant__name',
  deleteButton: 'button#restaurant-detail-delete-button',
  closeButton: 'button#restaurant-detail-close-button',
};

const RESTAURANT_LIST = {
  restaurantItem: '.restaurant',
  restaurantListTab: 'restaurant-list-tab',
  tabAllButton: 'restaurant-list-tab > #tab-all-button',
  tabFavoriteButton: 'restaurant-list-tab > #tab-favorite-button',
  favoritedButton: '.restaurant__favorite-button.favorited',
};

const RESTAURANT_LIST_FILTER = {
  restaurantItem: '.restaurant',
  restaurantName: 'h3.restaurant__name',
  filterContainer: 'restaurant-list-filter',
  categoryFilter: 'restaurant-list-filter > #category-filter',
  sortingFilter: 'restaurant-list-filter > #sorting-filter',
  tabFavoriteButton: 'button#tab-favorite-button',
  categoryIcon: 'img.category-icon',
};

module.exports = {
  RESTAURANT_ADD_MODAL,
  FAVORITE_BUTTON,
  RESTAURANT_DETAIL_MODAL,
  RESTAURANT_LIST,
  RESTAURANT_LIST_FILTER,
};
