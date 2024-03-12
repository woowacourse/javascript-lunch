// import '../'

const LUNCH_LIKED_ITEMS = /* HTML */ ` <lunch-liked-item></lunch-liked-item> `;

class LunchLikedItems extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = LUNCH_LIKED_ITEMS;
  }
}

customElements.define('lunch-liked-items', LunchLikedItems);
