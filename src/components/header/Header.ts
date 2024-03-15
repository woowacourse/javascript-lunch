import createImageButton from './ImageButton';
import Component from '../core/Component';

import dom from '@/utils/dom';

interface Props {
  title: string;
  imageSrc: string;
  onClick?: () => void;
}

class Header extends Component<Props> {
  render() {
    const header = document.createElement('header');
    const headerTitle = document.createElement('h1');

    header.classList.add('gnb');
    headerTitle.classList.add('gnb__title', 'text-title');
    headerTitle.textContent = this.props.title;

    const imageButton = createImageButton({ imageSrc: this.props.imageSrc, onClick: this.handleOpenModal.bind(this) });
    header.appendChild(headerTitle);
    header.appendChild(imageButton);
    this.$target.prepend(header);
  }

  handleOpenModal() {
    dom.getElement('.modal').classList.add('modal--open');
  }
}

export default Header;
