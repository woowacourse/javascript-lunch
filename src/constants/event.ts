export const FILTER_EVENT = {
  categoryFilterChange: "categoryFilterChange",
  sortFilterChange: "sortFilterChange",
} as const;

export const MODAL_EVENT = {
  restaurantFormModalAction: "restaurant-form-modal-action",
} as const;

export const MODAL_EVENT_ACTION = {
  open: "open",
  close: "close",
} as const;

export const RESTAURANT_EVENT = {
  restaurantFormSubmit: "restaurantFormSubmit",
} as const;
