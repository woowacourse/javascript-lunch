import BaseComponent from "../BaseComponent/BaseComponent";

class LunchApp extends BaseComponent {
  protected render() {
    this.innerHTML = `
          <global-navigation-bar></global-navigation-bar>
        `;
  }

  protected setEvent(): void {}
}

customElements.define("lunch-app", LunchApp);
