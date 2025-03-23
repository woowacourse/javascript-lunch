export interface UIConfigType {
  HEADER: HeaderConfigType;
  TABS: TabsConfigType;
  BUTTONS: ButtonsConfigType;
}
export interface HeaderConfigType {
  title: string;
  buttonTitle: string;
  buttonImage: string;
}
interface TabsConfigType {
  ALL: TabConfig;
  FAVORITE: TabConfig;
}
export interface TabConfig {
  text: string;
  attribute: TabConfigAttribute;
}
interface TabConfigAttribute {
  type: string;
  id: string;
  className: string;
}
interface ButtonsConfigType {
  CANCEL: ButtonConfigType;
  ADD: ButtonConfigType;
  DELETE: ButtonConfigType;
  CLOSE: ButtonConfigType;
}
export interface ButtonConfigType {
  text: string;
  attribute: ButtonAttribute;
}
interface ButtonAttribute {
  type: string;
  className: string;
  id?: string;
  disabled?: boolean;
}
