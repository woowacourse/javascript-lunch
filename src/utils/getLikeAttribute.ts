interface getLikedAttributeType {
  execute: () => boolean;
}

const getLikedAttribute: getLikedAttributeType = {
  execute(): boolean {
    if (this instanceof HTMLElement) {
      const likedAttribute = this.getAttribute('liked') ?? '';
      const liked = likedAttribute === 'true';
      return liked;
    }
    return false;
  },
};

export default getLikedAttribute;
