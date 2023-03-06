export interface Component<T> {
  $component: HTMLElement;
  state: T;
  setState: (state: T) => void;
  render: () => void;
}
