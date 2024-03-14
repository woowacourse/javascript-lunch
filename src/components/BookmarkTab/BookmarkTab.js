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

  connectedCallback() {
    this.#tabItems = this.querySelectorAll('.tab-item');
    this.addEventListener('click', this.#handleClickTabItem.bind(this));
  }

  // TODO: 이 로직이 최선인가? 리팩토링
  #handleClickTabItem(e) {
    const targetItem = e.target;
    this.#tabItems.forEach((tabItem) => {
      tabItem.classList.remove('active');
    });
    targetItem.classList.add('active');

    this.dispatchEvent(
      new CustomEvent(BOOKMARK_TAB_EVENTS.changeTab, {
        bubbles: true,
        detail: {
          isBookmark: targetItem.id === 'bookmark',
        },
      }),
    );
  }
}
