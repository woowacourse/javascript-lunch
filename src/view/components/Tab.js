export default class Tab {
  constructor(selector, callback) {
    this.tabItem = document.querySelector(selector);
    this.callback = callback;
    this.init();
  }

  init() {
    this.tabItem.addEventListener('click', (event) => {
      event.preventDefault();
      document.querySelector('.tab__item.active').classList.remove('active');
      this.tabItem.parentElement.classList.add('active');
      this.callback();
    });
  }

  isActive() {
    return this.tabItem.parentElement.classList.contains('active');
  }
}
