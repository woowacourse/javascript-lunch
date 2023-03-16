import Input from '@/components/common/form/Input';
import { define } from '@/components/decorators';
import Validation from '@/domain/Validation';

@define('r-restaurant-name-input')
class RestaurantNameInput extends Input {
  override validate() {
    try {
      Validation.validateRestaurantNameLength(this.value);
    } catch (e) {
      const error = e as Error;
      this.internals.setValidity(
        { badInput: true },
        error.message,
        this.shadowRoot?.querySelector('input') ?? undefined,
      );
      return;
    }
    this.internals.setValidity({});
  }
}

export default RestaurantNameInput;
