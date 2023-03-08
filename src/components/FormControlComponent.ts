import Component from './Component';

abstract class FormControlComponent extends Component {
  protected internals = this.attachInternals();

  static get formAssociated() {
    return true;
  }

  constructor() {
    super();

    this.addEventListener('blur', () => {
      this.onBlur();
    });
  }

  abstract get value(): string;

  override render(): void {
    super.render();

    this.internals.setFormValue(this.value);
  }

  /**
   * form과 연관될 때 해당 form에 event listener를 등록한다.
   */
  formAssociatedCallback() {
    this.form?.addEventListener('submit', () => {
      this.doValidate();
    });
  }

  onBlur() {
    this.doValidate();
  }

  private doValidate() {
    this.validate();
    this.setAttribute('validation-message', this.validationMessage);
  }

  /**
   * form이 제출되거나 focus가 다른 곳으로 이동할 때 validation이 수행된다.
   */
  validate(): void {}

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
    return this.localName;
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

export default FormControlComponent;
