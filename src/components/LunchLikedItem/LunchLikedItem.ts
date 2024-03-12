const LUNCH_LIKED_ITEM = /* HTML */ ``;

class LunchLikedItem extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = LUNCH_LIKED_ITEM;
  }
}

customElements.define('lunch-liked-item', LunchLikedItem);
