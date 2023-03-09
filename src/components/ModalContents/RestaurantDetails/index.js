import { $ } from '../../../utils';
import './index.css';

class RestaurantDetails extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="modal-container">
        <div class="button-container">
            <lunch-button type="click" name="삭제하기" id="deleteContent" color="white"></lunch-button>
            <lunch-button type="click" name="닫기" id="cancelModal" color="orange"></lunch-button>
        </div>
      </div>
    `;
  }
}

export default RestaurantDetails;
