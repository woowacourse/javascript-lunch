import ImageProps from './props/ImageProps';

class Image extends HTMLImageElement {
  constructor(props: ImageProps) {
    super();
    const { src, alt } = props;

    this.src = src;
    if (alt !== undefined) this.alt = alt;
  }
}

customElements.define('matzip-image', Image, { extends: 'img' });

export default Image;
