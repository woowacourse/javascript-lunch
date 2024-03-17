import './Header.css';

import createImageButton from '../common/ImageButton';
import Component from '../core/Component';

import dom from '@/utils/dom';

interface Props {
  title: string;
  imageSrc: string;
  onClick?: () => void;
}

class Header extends Component<Props> {
  render() {
    const imageButton = createImageButton({
      buttonAttributes: { type: 'button', classNames: ['gnb__button'], ariaLabel: '음식점 추가' },
      imageAttributes: { src: this.props.imageSrc, alt: '음식점 추가' },
      onClick: this.props.onClick,
    });
    const headerTitle = this.createTitle();
    const header = this.createHeader(headerTitle, imageButton);
    this.$target.prepend(header);
  }

  createTitle() {
    const title = dom.create({
      tagName: 'h1',
      classNames: ['gnb__title', 'text-title'],
      text: this.props.title,
    });
    return title;
  }

  createHeader(headerTitle: HTMLElement, imageButton: HTMLElement) {
    const header = dom.create({
      tagName: 'header',
      classNames: ['gnb'],
      children: [headerTitle, imageButton],
    });
    return header;
  }
}

export default Header;
