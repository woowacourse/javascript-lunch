import { $ } from '../utils/dom';

const html = `
  <div class="nav-button all-restaurant selected">모든 음식점</div>
  <div class="nav-button liked-restaurant">자주 가는 음식점</div>`;

export default class UpperTab {
  constructor(onClickNavTab) {
    $('.upper-tab').innerHTML = html;

    $('.upper-tab').addEventListener('click', onClickNavTab.bind(this));
  }
}
