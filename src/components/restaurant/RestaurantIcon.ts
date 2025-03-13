import createDOMElement from '../../util/createDomElement';

function RestaurantIcon({ src, alt }: { src: string; alt: string }) {
  return createDOMElement({
    tag: 'img',
    src,
    alt,
    class: 'category-icon',
  });
}

export default RestaurantIcon;
