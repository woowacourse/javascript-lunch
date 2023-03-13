import CustomElement from "../../abstracts/CustomElement";

class MenuComponent extends CustomElement {
  menuTitle = "";
  textColor = "var(--grey-300)";
  borderColor = "var(--grey-200)";

  rerender() {
    const style = this.shadowRoot.querySelector("style");
    style.innerHTML = `
        :host {
            width: 50%;
            height: 33px;
            border-bottom: 2px solid ${this.borderColor};
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
        }
        h3 {
            font-family: 'Roboto';
            font-style: normal;
            font-weight: 700;
            font-size: 16px;
            line-height: 24px;
            text-align: center;
            letter-spacing: 0.5px;
            color: ${this.textColor};
        }
    `;
  }

  template() {
    return `
            <style>
                * {
                    padding: 0;
                    margin: 0;
                    box-sizing: border-box;
                }
            </style>
            <div id="menu-box">
                <h3>${this.menuTitle}</h3>
            </div>
        `;
  }
}

export default MenuComponent;
