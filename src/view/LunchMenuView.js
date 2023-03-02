const LunchMenuView = {
  render() {
    document
      .querySelector('.restaurant-list-container')
      .insertAdjacentHTML('beforeend', `<restaurant-list></restaurant-list>`);
  },

  bindEvents() {
    document.querySelector('.gnb__button').addEventListener('click', () => {
      document.querySelector('.modal').showModal();
    });
  },
};

export default LunchMenuView;
