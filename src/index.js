import "../css/style.css";
import Modal from "../src/util/Modal"
import { $ } from "./util/querySelector";

const modal = new Modal();

const addButton = $(".gnb__button")
addButton.addEventListener("click", () => {
    modal.open();
});

const modalBg = $(".modal-backdrop")
modalBg.addEventListener("click", () => {
    modal.close();
});

document.addEventListener('keyup', (event) => {
    if (event.key === 'Escape') modal.close(); 
});

