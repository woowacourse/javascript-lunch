import CustomElement from "../../abstracts/CustomElement";
import StoreInstance from "../../domain/Store";

class ModalDetailComponent extends CustomElement {
  connectedCallback() {
    super.connectedCallback();
    StoreInstance.modalSubscribe(this);
    StoreInstance.publishDetail();
  }

  setEvent() {
    document.getElementById("close").addEventListener("click", this.hideModal);
  }

  hideModal() {
    document.getElementById("detail_modal").classList.remove("modal--open");
  }

  rerender(restaurant) {
    const detail = `
    <restaurant-detail
      category="${restaurant.category}" 
      name="${restaurant.name}" 
      distance="${restaurant.distance}" 
      description="${restaurant.description}" 
      link="${restaurant.link}"
      favorite="${restaurant.favorite}"
    >
    </restaurant-detail>
    `;
    document.getElementById("detail1").innerHTML = detail;
  }

  template() {
    return `
    <div id="detail_modal" class="modal">
        <div class="modal-backdrop"></div>
        <div id="detail1" class="modal-container">
        </div>
    </div>
    `;
  }
}

customElements.define("modal-detail", ModalDetailComponent);

export default ModalDetailComponent;
