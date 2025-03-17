import { FORM_FIELDS } from "../constants/formFields";

export type Category =
  | ""
  | "한식"
  | "중식"
  | "일식"
  | "양식"
  | "아시안"
  | "기타";
export type Distance = 5 | 10 | 15 | 20 | 30;
export type Sort = "" | "name" | "distance";

export interface IRestaurant {
  category: Category;
  distance: Distance;
  id: string;
  name: string;
  isFavorite: boolean;
  link?: string;
  description?: string;
}

export type EventType = { eventType: string; eventHandler: (e: Event) => void };

type InputFields = typeof FORM_FIELDS.INPUTS;
type InputFieldKey = keyof InputFields;
export type TypeInput = Exclude<InputFields[InputFieldKey], "create">;

type SelectFields = typeof FORM_FIELDS.SELECTS;
type SelectFieldKey = keyof SelectFields;
export type TypeSelect = Exclude<SelectFields[SelectFieldKey], "create">;

type TextareaFields = typeof FORM_FIELDS.TEXTAREAS;
type TextareaFieldKey = keyof TextareaFields;
export type TypeTextarea = Exclude<TextareaFields[TextareaFieldKey], "create">;
