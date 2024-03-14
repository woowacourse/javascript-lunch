import './style.css';

class AllRestaurantList extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = /* html */ `
    <div class="drop-box-group">
      <drop-box name="filteringCategory"></drop-box>
      <drop-box name="filteringSorting"></drop-box>
    </div>

      <ul class="restaurant-list" >
        <!--레스토랑 목록-->
      </ul>

    `;
  }
}

customElements.define('all-restaurant-list', AllRestaurantList);
