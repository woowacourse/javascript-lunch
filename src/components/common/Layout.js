import Component from "../../core/Component.js";

export default class Layout extends Component {
  setDefaultProps() {
    this.props = {
      children: [],
    };
  }
  template() {
    const { children } = this.props;

    return `
    <main 
      class="max-w-390 max-h-800 w-full flex flex-col justify-center items-center mx-16"
    >
    ${children.map((child) => child.template()).join("")}
    </main>`;
  }
}
