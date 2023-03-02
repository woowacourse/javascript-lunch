import { $ } from '../../utils';
import webView from '../../view/webView';

class LunchRecommendation {
  #restaurants;

  constructor() {}

  play() {
    $('add-restaurant-modal', '#addRestraunt').addEventListener(
      'click',
      (event) => {
        event.preventDefault();

        const category = $(
          'add-restaurant-modal',
          '#category'
        ).shadowRoot.querySelector('#categoryList').value;
        const name = $(
          'add-restaurant-modal',
          '#name'
        ).shadowRoot.querySelector('#nameInput').value;
        const distance = $(
          'add-restaurant-modal',
          '#distance'
        ).shadowRoot.querySelector('#distanceList').value;
        const description = $(
          'add-restaurant-modal',
          '#description'
        ).shadowRoot.querySelector('#descriptionInput').value;
        const link = $(
          'add-restaurant-modal',
          '#link'
        ).shadowRoot.querySelector('#linkInput').value;
        console.log(category, name, distance, description, link);
      }
    );

    $('lunch-header', '#openModal').addEventListener(
      'click',
      webView.openModal
    );

    $('add-restaurant-modal', '#cancleModal').addEventListener(
      'click',
      webView.closeModal
    );

    $('add-restaurant-modal', '#modalBackdrop').addEventListener(
      'click',
      webView.closeModal
    );

    document.addEventListener('keydown', (event) => {
      if (event.code === 'Escape') {
        webView.closeModal();
      }
    });

    $('add-restaurant-modal', '#cancleModal');
  }
}

export default LunchRecommendation;
