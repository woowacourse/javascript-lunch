export interface ButtonType {
  cssType: "secondary" | "primary";
  innerText: string;
  onClick: () => void;
}

export interface ButtonContainerType {
  buttons?: HTMLElement[];
}

export interface IconButtonType {
  imgSrc: string;
  label: string;
  onClick: (event: Event) => void;
}
