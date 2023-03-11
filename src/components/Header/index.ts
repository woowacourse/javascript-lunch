import $template from './index.html';

interface Props {
  onModalButtonClick: () => void;
}
class LunchHeader extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = $template;
  }

  setProps(props: Props) {
    this.setHandleModalButtonClick(props.onModalButtonClick);
  }

  private setHandleModalButtonClick(onModalButtonClick: Props['onModalButtonClick']) {
    const $button = this.querySelector('.gnb__button');
    $button?.addEventListener('click', onModalButtonClick);
  }
}

export default LunchHeader;
