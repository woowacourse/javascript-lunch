export const FILTER_EVENT = {
  categoryFilterChange: "categoryFilterChange",
  sortFilterChange: "sortFilterChange",
} as const;

export const MODAL_EVENT = {
  restaurantFormModalAction: "restaurantFormModalAction",
  restaurantDetailModalAction: "restaurantDetailModalAction",
} as const;

export const MODAL_EVENT_ACTION = {
  open: "open",
  close: "close",
} as const;

export const RESTAURANT_FORM_SUBMIT_EVENT = "restaurantFormSubmit" as const;

export const TAB_SWITCH_EVENT = "tabSwitch" as const;

export const TAB_SWITCH_EVENT_SWITCH_TO = {
  all: "all",
  favorite: "favorite",
} as const;

export const TOGGLE_FAVORITE_EVENT = "toggleFavorite" as const;

export const RESTAURANT_DETAIL_SHOW_EVENT = "restaurantDetailShow" as const;
