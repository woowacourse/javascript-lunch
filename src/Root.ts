import Matzip from './matzip';
import DOM from './utils/DOM';
import { FilterChangeEvent } from './components/FilterContainer';
import Restaurant from './components/Restaurant';
import { CategoryType, SortType, Restaurant as RestaurantType } from './types';
import storage from './storage';
import { Select, Input, TextArea } from './components/tag';
import { FavoriteIconFilled, FavoriteIconLined } from './asset/img';
import RestaurantDetail from './components/RestaurantDetail';

const { $, $$ } = DOM;

const MATZIP_DATA = 'matzipData';
const FAVORITE_MATZIP_DATA = 'favoriteMatzipData';

const root = {
  init() {
    const matzip = new Matzip(storage.getData(MATZIP_DATA));
    this.initList(matzip);
    this.listenCategoryChange(matzip);
    this.listenRestaurantAdd(matzip);
    //this.toggleFavoriteIcon(matzip);
  },

  initList(matzip: Matzip) {
    document.addEventListener('DOMContentLoaded', () => {
      const initSort = $('#sorting-filter') as HTMLSelectElement;
      const sortBy = initSort.options[initSort.selectedIndex].value;

      matzip.filterAndSort('전체', sortBy as SortType).forEach((restaurant) => {
        $('.restaurant-list-container')?.appendChild(new Restaurant(restaurant, false));
      });
    });
  },

  listenCategoryChange(matzip: Matzip) {
    document.addEventListener('filterChange', (event: Event) => {
      Array.from($$('.restaurant')).map((node) => node.remove());

      const customEvent = event as FilterChangeEvent;
      const selectedCategory = customEvent.detail.selectedCategory;
      const selectedSort = customEvent.detail.selectedSort;
      const restaurants = matzip.filterAndSort(
        selectedCategory as CategoryType,
        selectedSort as SortType,
      );
      restaurants.forEach((restaurant) => {
        $('.restaurant-list-container')?.appendChild(new Restaurant(restaurant, false));
      });
    });
  },

  listenRestaurantAdd(matzip: Matzip) {
    $('#restaurant-form')?.addEventListener('submit', (event) => {
      event.preventDefault();
      const fieldValues = Array.from($$('.form-item')).map((item) => {
        const field = item.children[1] as Select | TextArea | Input;
        return field.getValue();
      });

      const newRestaurant: RestaurantType = {
        category: fieldValues[0] as CategoryType,
        name: fieldValues[1],
        distance: Number(fieldValues[2]),
        introduction: fieldValues[3],
        link: fieldValues[4],
      };

      try {
        matzip.add(newRestaurant);
        storage.addData(MATZIP_DATA, newRestaurant);
        $('.modal')?.classList.remove('modal--open');
        $('.restaurant-list-container')?.appendChild(new Restaurant(newRestaurant, false));
      } catch (error) {
        alert(error);
      }
    });
  },

  // toggleFavoriteIcon(matzip: Matzip) {
  //   const favoriteImg = $('.restaurant__favorite_img img');

  //   favoriteImg?.addEventListener('click', (e) => {
  //     console.log('hi');
  //     const isFavorite = favoriteImg.getAttribute('src') === FavoriteIconFilled ? true : false;
  //     favoriteImg.setAttribute('src', isFavorite ? FavoriteIconLined : FavoriteIconFilled);

  //     const parentId = favoriteImg.parentElement?.parentElement?.getAttribute('id');
  //     console.log('parentID:', parentId);

  //     const matzipList = matzip.getRestaurants();

  //     const item = matzipList.find((matzip) => {
  //       return parentId === `${matzip.category}_${matzip.name}`;
  //     });

  //     if (item === undefined) return;

  //     const storageDate = storage.getData('favoriteMatzipData');

  //     console.log('item : ', item);

  //     if (!isFavorite) {
  //       storage.addData('favoriteMatzipData', item);
  //       $('matzip-favorite-container .restaurant-list-container')?.appendChild(
  //         new Restaurant(item, true),
  //       );
  //     } else {
  //       storage.removeData('favoriteMatzipData');
  //       storageDate.forEach((data) => {
  //         if (data !== item) storage.addData('favoriteMatzipData', data);
  //       });
  //       $(`matzip-favorite-container #${item.category}_${item.name}`)?.remove();
  //     }
  //   });
  // },
};

export default root;
