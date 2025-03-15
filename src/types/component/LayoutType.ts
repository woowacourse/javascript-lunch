import { Filter } from "../../domain/Filter";

export interface AlertType {
  message: string;
}

export interface HeaderType {
  title: string;
  icon: Element | null;
}

export interface ModalSetContentType {
  modalContent: Element;
}

export interface ModalCloseContentType {
  filter: Filter | null;
}
