import '../css/RestaurantDetail.css';
import '../../assets/add-button.png';

import { useEvents } from '../../utils/core';
import { useRestaurants } from '../../utils/hooks/useRestaurants';
import { RestaurantInfo } from '../../domain/model/LunchRecommendation';
import { getCategoryImageSrc, getFavoriteIconSrc } from '../../utils/common/getImageSrc';

interface DetailProps {
  info: RestaurantInfo;
  closeDetail: VoidFunction;
  handleClickIcon: (restaurantId: RestaurantInfo['id']) => void;
  handleClickDeleteBtn: (restaurantId: RestaurantInfo['id']) => void;
}

function RestaurantDetail({
  info,
  closeDetail,
  handleClickIcon,
  handleClickDeleteBtn,
}: DetailProps) {
  const { id, category, name, isOften, distance, description, link } = info;
  const iconStyle = isOften === false ? 'lined' : 'filled';

  const [addEvent] = useEvents('.modal-container');

  addEvent('click', '.favorite-icon', (e) => {
    if (e.target instanceof HTMLImageElement) {
      e.target.src = getFavoriteIconSrc(e.target.src);
      console.log(e.target.id);
      handleClickIcon(Number(e.target.id));
    }
  });

  addEvent('click', '#delete', (e) => {
    if (window.confirm('정말 삭제하시겠습니가?')) {
      console.log('really 삭제됨');
      handleClickDeleteBtn(id);
      closeDetail();
      window.location.reload();
    }
  });

  addEvent('click', '#close', (e) => {
    closeDetail();
  });

  return `
    <div class="modal modal--open">
      <div class="modal-backdrop"></div>
      <div class="modal-container">
        <!-- 카테고리 & 별 아이콘 -->
        <header class="modal-header">
          <div class="restaurant__category">
            <img src=${getCategoryImageSrc(category)} alt=${category} class="category-icon">
          </div>
          
          <div class="restaurant__often">
            <img src='./favorite-icon-${iconStyle}.png' class="favorite-icon" id=${id}>
          </div>
         </header>

         <!-- 음식점 정보 -->
         <div class="detail__restaurant__info">
          <h3 class="restaurant__name text-title" id=${id}>${name}</h3>
          <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 내</span>
          <p class="detail__restaurant__description">${description}</p>
          <a href=${link}>${link}</a>
        </div>
        
        <!-- 삭제 버튼 -->
        <div class="button-container detail-buttons">
          <button class="button button--secondary text-caption" id="delete">삭제하기</button>
          <button class="button button--primary text-caption" id="close">닫기</button>
        </div>
      </div>
  </div>
  `;
}

export { RestaurantDetail };
