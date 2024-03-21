import { IMAGE_MAP } from '../../constants/imageMap';
import { CATEGORY, DISTANCE } from '../../constants/restaurant';
import { Restaurant } from '../../types/restaurant';
import { H3 } from '../singleElement/H3';
import { Img } from '../singleElement/Img';
import { P } from '../singleElement/P';
import { Span } from '../singleElement/Span';

export const RestCard = ({ category, name, distance, description, link }: Restaurant): HTMLLIElement => {
  /* li */
  const $card = document.createElement('li');
  $card.classList.add('rest-card');

  /* 카테고리 이미지 */
  const $imgContainer = document.createElement('div');
  const $img = Img({ img: { src: IMAGE_MAP.category[category], alt: CATEGORY[category], class: 'category-icon' } });

  $imgContainer.classList.add('rest-card__category');

  /* 레스토랑 디테일 */
  const $infoContainer = document.createElement('div');
  const $name = H3({ h3: { class: 'rest-card__name' }, text: name });
  const $distance = Span({ span: { class: 'rest-card__distance' }, text: `캠퍼스부터 ${DISTANCE[distance]}` });
  const $description = P({ p: { class: 'rest-card__description' }, text: description });

  $infoContainer.classList.add('rest-card__info');

  /* 컴포넌트 조립 */
  $imgContainer.appendChild($img);
  $infoContainer.appendChild($name);
  $infoContainer.appendChild($distance);
  $infoContainer.appendChild($description);
  $card.appendChild($imgContainer);
  $card.appendChild($infoContainer);

  return $card;
};
