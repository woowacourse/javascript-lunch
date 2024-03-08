class HomeEventHandler {
  constructor() {
    this.setEvent();
  }

  setEvent() {
    document.querySelector('.gnb__button').addEventListener('click', this.handleOpenModal);
  }

  handleOpenModal() {
    document.querySelector('.modal').classList.add('modal--open');
  }
}

export default HomeEventHandler;
