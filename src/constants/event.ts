export const FILTER_EVENT = {
  categoryFilterChange: "categoryFilterChange",
  sortFilterChange: "sortFilterChange",
} as const;

export const MODAL_EVENT = {
  restaurantFormModalAction: "restaurantFormModalAction",
} as const;

export const MODAL_EVENT_ACTION = {
  open: "open",
  close: "close",
} as const;

export const RESTAURANT_EVENT = {
  restaurantFormSubmit: "restaurantFormSubmit",
} as const;

export const TAB_SWITCH_EVENT = "tabChange" as const;

export const TAB_SWITCH_EVENT_SWITCH_TO = {
  all: "all",
  favorite: "favorite",
} as const;
