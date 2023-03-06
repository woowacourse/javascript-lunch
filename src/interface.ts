export interface Component<T> {
  $parent: HTMLElement;
  state: T;
  setState: (state: T) => void;
  render: () => void;
}
