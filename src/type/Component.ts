export interface Component {
  $target: Element;
  template: () => string;
  render?: () => void;
}
