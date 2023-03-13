export interface Component<T> {
  $target: HTMLElement;
  state: T;
  setState?: (state: T) => void;
  render?: () => void;
}
