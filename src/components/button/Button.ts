import './Button.css';

import type RestaurantList from '@/domain/RestaurantList';
import type { IButtonAttributes } from '@/types/dom';

import Component from '../core/Component';

import dom from '@/utils/dom';

interface IButtonProps {
  attributes: IButtonAttributes;
  kind: 'close' | 'add' | 'delete';
  handleCloseModal: () => void;
  restaurantList?: RestaurantList;
  handleDeleteRestaurant?: (id: string) => void;
  handleAddRestaurant?: (e: SubmitEvent) => void;
}

class Button extends Component<IButtonProps> {
  render() {
    const { id, classNames, type, text } = this.props.attributes;
    const buttonTag = dom.createButtonTag({ id, classNames, type, text });
    this.$target.appendChild(buttonTag);
    this.$target = buttonTag;
  }

  setEvent() {
    const { kind, handleCloseModal, handleDeleteRestaurant, handleAddRestaurant } = this.props;

    if (kind === 'add') {
      dom.getElement('form').addEventListener('submit', e => {
        handleAddRestaurant && handleAddRestaurant(e);
      });
    } else if (kind === 'close') {
      this.$target.addEventListener('click', handleCloseModal.bind(this));
    } else if (kind === 'delete') {
      this.$target.addEventListener('click', () => {
        const $button = dom.getTargetElement(dom.getElement('#detail-favorite-container'), 'button');
        handleDeleteRestaurant && handleDeleteRestaurant($button.id);
      });
    }
  }
}

export default Button;
