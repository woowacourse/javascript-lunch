import images from '../img/images';

class Header {
  public template() {
    return `
      <header class="gnb">
        <h1 class="gnb__title text-title">점심 뭐 먹지</h1>
        <button id="addRestaurantButton" type="button" class="gnb__button" aria-label="음식점 추가">
          <img src="${images.추가버튼}" alt="음식점 추가">
        </button>
      </header>
    `;
  }

  public bindAddRestaurantButton(): void {
    const addRestaurantButton = document.querySelector('#addRestaurantButton');
    if (addRestaurantButton) {
      addRestaurantButton.addEventListener('click', this.addRestaurantClicked);
    }
  }

  private addRestaurantClicked() {
    const event = new CustomEvent('addRestaurantClicked');
    document.dispatchEvent(event);
  }
}
export default Header;
