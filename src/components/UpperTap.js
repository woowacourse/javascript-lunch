import { $ } from '../utils/dom';

const html = `
  <div class="all-restaurant selected">모든 음식점</div>
  <div class="liked-restaurant">자주 가는 음식점</div>`;

export default class UpperTap {
  constructor(onClickNavTap) {
    $('.upper-tap').innerHTML = html;
    this.registerEvent(onClickNavTap);
  }

  registerEvent(onClickNavTap) {
    $('.upper-tap').addEventListener('click', onClickNavTap);
  }
}
