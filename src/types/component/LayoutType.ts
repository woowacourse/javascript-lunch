import { Filter } from "../../domain/Filter";

export interface AlertType {
  message: string;
}

export interface HeaderType {
  title: string;
  icon: HTMLElement | null;
}

export interface ModalSetContentType {
  filter: Filter | null;
  modalContent: HTMLElement;
}

export interface ModalCloseContentType {
  filter: Filter | null;
}
