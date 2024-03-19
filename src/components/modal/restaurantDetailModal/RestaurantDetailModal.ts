import './RestaurantDetailModal.css';

import type RestaurantList from '@/domain/RestaurantList';
import type { IRestaurant } from '@/types/restaurant';

import Button from '../../button/Button';
import createImageButton from '../../common/ImageButton';
import Modal from '../Modal';

import FAVORITE_STAR from '@/assets/images/favorite-icon-filled.png';
import NOT_FAVORITE_STAR from '@/assets/images/favorite-icon-lined.png';
import { MODAL_CLOSE_BUTTON_ATTRIBUTE, MODAL_DELETE_BUTTON_ATTRIBUTE } from '@/constants/button';
import { CATEGORY_IMG_SRC } from '@/constants/filter';
import dom from '@/utils/dom';

interface IDetailModalProps {
  restaurantList: RestaurantList;
}

class RestaurantDetailModal extends Modal<IDetailModalProps> {
  information?: IRestaurant;
  imageTag = dom.getElement('#detail-category-icon');
  nameTag = dom.getElement('#detail-modal-title');
  distanceTag = dom.getElement('#detail-modal-distance');
  descriptionTag = dom.getElement('#detail-modal-description');
  linkTag = dom.getElement('#detail-modal-link');

  template() {
    return /* html */ `
    <div class="detail-header-wrapper">
      <div class="restaurant__category">
        <img id="detail-category-icon" class="category-icon" src='' alt="음식점 추가" />
      </div>
      <div id="detail-favorite-container">
        <img id="detail-favorite-icon" class="category-icon" src='' alt="자주 가는 음식점 등록" />
      </div>
    </div>
    <div class="detail-body-wrapper">
      <h1 id="detail-modal-title" class="text-title"></h1>
      <span id="detail-modal-distance" class='restaurant__distance text-body'></span>
      <p id="detail-modal-description" class='text-body'></p>
      <a id="detail-modal-link" id='reference-link' href='' target="_blank"></a>
    </div>
    <div id='detail-button-container' class='button-container'></div>
    `;
  }

  render() {
    const $modalContainer = dom.getElement('#detail-modal-container');
    $modalContainer.innerHTML += this.template();
  }

  dispatchSelectEvent() {
    const $allTab = dom.getElement('#all-tab');
    const filterEvent = new Event('click', {
      bubbles: true,
      cancelable: true,
    });
    $allTab.dispatchEvent(filterEvent);
  }

  setRestaurant(information: IRestaurant, handleClickFavorite: (id: string) => void) {
    this.information = information;
    const { id, category, name, distance, description, referenceLink, isFavorite } = information;
    const { imageTag, nameTag, distanceTag, descriptionTag, linkTag } = this;

    imageTag.setAttribute('src', `${CATEGORY_IMG_SRC[category]}`);
    nameTag.textContent = name;
    distanceTag.textContent = `캠퍼스부터 ${distance}분 내`;
    descriptionTag.textContent = description ?? '';
    linkTag.setAttribute('href', referenceLink ?? '');
    linkTag.textContent = referenceLink ?? '';

    this.renderDetailImageButton(id, isFavorite, handleClickFavorite);

    const $buttonContainer = dom.getElement('#detail-button-container');
    $buttonContainer.replaceChildren();
    new Button($buttonContainer, {
      attributes: MODAL_DELETE_BUTTON_ATTRIBUTE,
      onClick: () => {
        this.props.restaurantList.deleteRestaurant(id);
        this.dispatchSelectEvent();
        this.toggle();
      },
    });
    new Button($buttonContainer, {
      attributes: MODAL_CLOSE_BUTTON_ATTRIBUTE,
      onClick: this.toggle.bind(this),
    });
  }

  renderDetailImageButton(id: string, isFavorite: boolean, handleClickFavorite: (id: string) => void) {
    const $detailWrapper = dom.getElement('#detail-favorite-container');
    $detailWrapper.replaceChildren();
    const imageButton = createImageButton({
      buttonId: id,
      imageSrc: isFavorite ? FAVORITE_STAR : NOT_FAVORITE_STAR,
      alt: '자주 가는 음식점 등록',
      onClick: () => {
        handleClickFavorite(id);
        this.renderDetailImageButton(id, !isFavorite, handleClickFavorite);
      },
    });
    $detailWrapper.appendChild(imageButton);
  }
}

export default RestaurantDetailModal;
