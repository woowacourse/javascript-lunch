import Component from "../../core/Component.js";

export default class LunchList extends Component {
  setDefaultProps() {
    this.props = {
      lunchList: [],
    };
  }

  template() {
    const { lunchList } = this.props;

    return `
      <section class="w-full h-full flex flex-col justify-center items-center my-16">
        <ul id="restaurant-list">
        ${lunchList.map((lunch) => lunch.template()).join("")}
        </ul>
      </section>
    `;
  }
}
