import addRestaurant from '../../domain/addRestaurant';

const AddRestaurantModal = {
  create() {
    this.setHandle();
  },

  show() {
    const addRestaurantModal = document.querySelector('.add-restaurant-modal');
    addRestaurantModal?.classList.replace('modal', 'modal--open');
  },

  setHandle() {
    const addRestaurantModal = document.querySelector('.add-restaurant-modal');
    const cancelButton = addRestaurantModal?.querySelector('#cancel');
    cancelButton?.addEventListener('click', () => {
      if (addRestaurantModal) {
        this.clearInput(addRestaurantModal);
        addRestaurantModal?.classList.replace('modal--open', 'modal');
      }
    });
    const submitRestaurantButton = addRestaurantModal?.querySelector('#submit-restaurant');
    submitRestaurantButton?.addEventListener('click', () => {
      if (addRestaurantModal) {
        const addRestaurantForm = addRestaurantModal?.querySelector('#add-restaurant-form');
        const formObj = Object.fromEntries(new FormData(addRestaurantForm! as HTMLFormElement).entries());
        addRestaurant(formObj);
        this.clearInput(addRestaurantModal);
        addRestaurantModal?.classList.replace('modal--open', 'modal');
      }
    });
  },

  clearInput(addRestaurantModal: Element) {
    addRestaurantModal.querySelectorAll('select').forEach((selectElement) => {
      selectElement.selectedIndex = 0;
    });
    addRestaurantModal.querySelectorAll('input').forEach((selectedElement) => {
      selectedElement.value = '';
    });
    addRestaurantModal.querySelectorAll('textarea').forEach((selectedElement) => {
      selectedElement.value = '';
    });
  },
};

export default AddRestaurantModal;
