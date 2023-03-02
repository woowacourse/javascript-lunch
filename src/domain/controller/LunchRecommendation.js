import { $ } from '../../utils';
import webView from '../../view/webView';

class LunchRecommendation {
  constructor() {}

  play() {
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
  }
}

export default LunchRecommendation;
