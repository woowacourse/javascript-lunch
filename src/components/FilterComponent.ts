// import RestaurantList from '../domain/restaurantList';
// import { CategoryValues, SortingFilterType } from '../types/types';

// const filters = {
//   categoryFilter: (selectElement: HTMLSelectElement, restaurantList: RestaurantList) => {
//     const selectedCategory = selectElement.value as CategoryValues;
//     restaurantList.setCategory(selectedCategory);
//   },
//   sortFilter: (selectElement: HTMLSelectElement, restaurantList: RestaurantList) => {
//     const selectedCategory = selectElement.value as '이름순' | '거리순';
//     restaurantList.setSort(selectedCategory);
//   }
// };

// export function FilterComponent() {
//   const getTemplate = (options: object) => {
//     const template = document.createElement('template');
//     template.innerHTML = /*html*/ `
//         <section class="restaurant-filter-container">
//           <select name="category" id="category-filter" class="restaurant-filter">
//             ${generateOption(options)}
//           </select>
//         </section>
//       `;
//     const node = template.content.cloneNode(true) as DocumentFragment;

//     return node;
//   };

//   const generateOption = (options: object) => {
//     return Object.values(options)
//       .map((category) => `<option value="${category}">${category}</option>`)
//       .join('');
//   };

//   const setEvent = (node: DocumentFragment, restaurantList: RestaurantList) => {
//     const selectElement = node.querySelector('#category-filter') as HTMLSelectElement;
//     selectElement.addEventListener('change', () => {
//       const selectedCategory = selectElement.value as CategoryValues;
//       restaurantList.setCategory(selectedCategory);
//       // const selectedCategory = selectElement.value as '이름순' | '거리순'
//       // restaurantList.setSort(selectedCategory);
//     });
//   };

//   return {
//     getTemplate,
//     setEvent
//   };
// }

import RestaurantList from '../domain/restaurantList';
import { CategoryValues, SortingFilterType } from '../types/types';

export default class FilterComponent {
  getTemplate = (options: object) => {
    const template = document.createElement('template');
    template.innerHTML = /*html*/ `
        <section class="restaurant-filter-container">
          <select name="category" id="category-filter" class="restaurant-filter">
            ${this.generateOption(options)}
          </select>
        </section>
      `;
    const node = template.content.cloneNode(true) as DocumentFragment;

    return node;
  };

  generateOption = (options: object) => {
    return Object.values(options)
      .map((category) => `<option value="${category}">${category}</option>`)
      .join('');
  };
}
