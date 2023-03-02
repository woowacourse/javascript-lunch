export default class RestaurantContainer {
  #template = `
    <main>
        <section class="restaurant-list-container">
            <ul class="restaurant-list">
            </ul>
        </section>
    </main>
    `;

  constructor() {
    document.body.insertAdjacentHTML("beforeend", this.#template);
  }
}
