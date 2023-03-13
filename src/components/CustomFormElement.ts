import CustomElement from './CustomElement';

abstract class CustomFormElement extends CustomElement {
  protected internals = this.attachInternals();

  static get formAssociated() {
    return true;
  }

  /**
   * Form Associated Element 에서 기본적으로 제공되어야 할 프로퍼티
   */
  get form() {
    return this.internals.form;
  }

  /**
   * Form Associated Element 에서 기본적으로 제공되어야 할 프로퍼티
   */
  get name() {
    return this.getAttribute('name');
  }

  /**
   * Form Associated Element 에서 기본적으로 제공되어야 할 프로퍼티
   */
  get type() {
    return this.getAttribute('type');
  }

  /**
   * Form Associated Element 에서 기본적으로 제공되어야 할 프로퍼티
   */
  get validity() {
    return this.internals.validity;
  }

  /**
   * Form Associated Element 에서 기본적으로 제공되어야 할 프로퍼티
   */
  get validationMessage() {
    return this.internals.validationMessage;
  }

  /**
   * Form Associated Element 에서 기본적으로 제공되어야 할 프로퍼티
   */
  get willValidate() {
    return this.internals.willValidate;
  }

  /**
   * Form Associated Element 에서 기본적으로 제공되어야 할 프로퍼티
   */
  checkValidity() {
    return this.internals.checkValidity();
  }

  /**
   * Form Associated Element 에서 기본적으로 제공되어야 할 프로퍼티
   */
  reportValidity() {
    return this.internals.reportValidity();
  }
}

export default CustomFormElement;
