export type ModalType = {
  title?: string;
  id: string;
};

export type RestaurantAddModalType = ModalType & {
  onSubmit: Function;
};
