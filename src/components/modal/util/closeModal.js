import Restaurant from "../../restaurant/Restaurant";

export default function closeModal() {
    document.querySelector(".modal").remove();
    Restaurant({isReRender: true});
}