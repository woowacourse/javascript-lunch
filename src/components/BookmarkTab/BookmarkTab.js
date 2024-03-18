import './BookmarkTab.css';

export const BOOKMARK_TAB_EVENTS = {
  changeTab: 'tabBookmarkItem',
};

export default class BookmarkTab extends HTMLElement {
  #tabItems;

  constructor() {
    super();

    const template = document.querySelector('#template-bookmark-tab');
    const content = template.content.cloneNode(true);
    this.appendChild(content);
  }

  get isBookmark() {
    return this.querySelector('.active').id === 'bookmark';
  }

  connectedCallback() {
    this.#tabItems = this.querySelectorAll('.tab-item');
    this.addEventListener('click', this.#handleClickTabItem.bind(this));
  }

  #handleClickTabItem(e) {
    const targetItem = e.target;
    this.#tabItems.forEach((tabItem) => {
      tabItem.classList.remove('active');
    });
    targetItem.classList.add('active');

    this.dispatchEvent(
      new CustomEvent(BOOKMARK_TAB_EVENTS.changeTab, {
        bubbles: true,
      }),
    );
  }
}
