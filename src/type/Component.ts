export interface Component {
  $target: Element;
  template?(): string;
  render(): void;
  reRender?(): void;
  show?(): void;
  hide?(): void;
  setEventHandler?(elementName: any, handler: () => void): void;
}

export interface Modal extends Component {
  setCloseModalHandler(): void;
}
