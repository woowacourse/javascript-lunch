import Component from '../Component';

export default class Favorite extends Component {
  constructor($target) {
    super($target);
  }

  template() {
    return `
    <div class="favorite-item">
      <input type="radio" id="all__restaurant__radio" name="favorite" aria-label="모든 음식점" checked />
      <label for="all__restaurant__radio">모든 음식점</label>
      <div></div>
    </div>
    <div class="favorite-item">
      <input type="radio" id="favorite__restaurant__radio" name="favorite" aria-label="자주 가는 음식점" />
      <label for="favorite__restaurant__radio">자주 가는 음식점</label>
      <div></div>
    </div>
      `;
  }
}
