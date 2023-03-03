import { $$$ } from '../../utils';
import webView from '../../view/webView';

class LunchRecommendation {
  #restaurants;

  constructor() {}

  play() {
    $$$('add-restaurant-modal', '#addRestraunt').addEventListener(
      'click',
      (event) => {
        event.preventDefault();

        const category = $$$('add-restaurant-modal', '#categoryList').value;
        const name = $$$('add-restaurant-modal', '#nameInput').value;

        const distance = $$$('add-restaurant-modal', '#distanceList').value;
        const description = $$$(
          'add-restaurant-modal',
          '#descriptionInput'
        ).value;
        const link = $$$('add-restaurant-modal', '#linkInput').value;
      }
    );

    $$$('lunch-header', '#openModal').addEventListener(
      'click',
      webView.toggleModal
    );

    $$$('add-restaurant-modal', '#cancleModal').addEventListener(
      'click',
      webView.toggleModal
    );

    $$$('add-restaurant-modal', '#modalBackdrop').addEventListener(
      'click',
      webView.toggleModal
    );

    document.addEventListener('keydown', (event) => {
      if (event.code === 'Escape') {
        webView.toggleModal();
      }
    });
  }
}

export default LunchRecommendation;
