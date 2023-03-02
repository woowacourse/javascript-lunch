import LunchMenuView from '../view/LunchMenuView';

const LunchMenuController = {
  init() {
    LunchMenuView.render();
    LunchMenuView.bindEvents();
  },
};

export default LunchMenuController;
