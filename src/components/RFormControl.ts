import RComponent from './RComponent';

abstract class RFormControl extends RComponent {
  protected internals = this.attachInternals();

  static get formAssociated() {
    return true;
  }
}

export default RFormControl;