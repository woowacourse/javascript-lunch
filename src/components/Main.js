export default class Main {
  constructor() {}

  render() {
    /*html*/
    return `
      <section id="restaurant-filter-container" class="restaurant-filter-container">
      </section>

      <!-- 음식점 목록 -->
      <section class="restaurant-list-container">
        <ul id="restaurant-list" class="restaurant-list">
        </ul>
      </section>
      <div id="restaurant-creation-modal" class="modal"></div>
    `;
  }
}
