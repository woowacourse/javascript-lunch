import Component from "../../core/Component.js";

export default class Layout extends Component {
  template() {
    return `
    <main id="layout" class="max-w-390 w-full h-full flex flex-col justify-start items-center mx-16 bg-white">
    ${this.children.map((child) => child.template()).join("")}
    </main>`;
  }
}
