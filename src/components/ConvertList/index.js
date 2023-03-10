import './index.css';

class ConvertList extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <div class="convert-list-container">
        <div class="convert-list clicked">모든 음식점</div>
        <div class="convert-list">자주 가는 음식점</div>
    </div>
    `;
  }
}

export default ConvertList;
