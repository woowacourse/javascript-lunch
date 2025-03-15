import { Filter } from "../../domain/Filter";

export interface AlertType {
  message: string;
}

export interface HeaderType {
  title: string;
  icon: HTMLElement | null;
}

export interface ModalSetContentType {
  modalContent: HTMLElement;
  filter: Filter | null;
}

export interface ModalCloseContentType {
  filter: Filter | null;
}
