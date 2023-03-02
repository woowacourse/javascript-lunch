const LunchMenuController = {
  render() {
    document
      .querySelector('.restaurant-list-container')
      .insertAdjacentHTML('beforeend', `<restaurant-list></restaurant-list>`);
  },
};

export default LunchMenuController;
