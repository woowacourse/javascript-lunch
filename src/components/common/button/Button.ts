import './Button.css';

import type { IButtonAttributes } from '@/types/dom';

import Component from '../../core/Component';

import dom from '@/utils/dom';

interface IButtonProps {
  attributes: IButtonAttributes;
  onClick?: () => void;
}

class Button extends Component<IButtonProps> {
  render() {
    const { id, classNames, type, text, disabled } = this.props.attributes;
    const buttonTag = dom.createButtonTag({ id, classNames, type, text, disabled });
    this.$target.appendChild(buttonTag);
    this.$target = buttonTag;
  }

  setEvent() {
    if (this.props.onClick) this.$target.addEventListener('click', this.props.onClick);
  }
}

export default Button;
