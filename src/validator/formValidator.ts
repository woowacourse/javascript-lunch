import type { TCategory, TDistance, TFormValidRestaurant } from '@/types/restaurant';
import dom from '@/utils/dom';

const formValidator = {
  isValidForm({ category, name, distance, referenceLink }: TFormValidRestaurant): boolean {
    return (
      this.isValidCategory(category) &&
      this.isValidName(name) &&
      this.isValidDistance(distance) &&
      this.isValidLink(referenceLink)
    );
  },

  isValidCategory(category: TCategory): boolean {
    if (category.trim().length > 0) return true;
    return false;
  },

  isValidName(name: string): boolean {
    if (name.trim().length > 0) return true;
    return false;
  },

  isValidDistance(distance: TDistance): boolean {
    if (distance > 0) return true;
    return false;
  },

  isValidLink(link: string | undefined): boolean {
    if (link === undefined || link.length === 0) return true;

    const $errorLink = dom.getElement('#error-link');
    if (!(link.startsWith('http://') || link.startsWith('https://'))) {
      $errorLink.classList.remove('hidden');
      return false;
    }
    $errorLink.classList.add('hidden');
    return true;
  },
};

export default formValidator;
