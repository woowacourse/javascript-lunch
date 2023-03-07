import CustomElement from "../../abstracts/CustomElement";

class MenuComponent extends CustomElement {
  menuTitle = "";
  textColor = "var(--grey-300)";
  borderColor = "var(--grey-200)";

  rerender() {
    const style = document.createElement("style");
    style.innerHTML = `
        * {
            padding: 0;
            margin: 0;
            box-sizing: border-box;
        }
        :host {
            width: 50%;
            height: 100%;
            border-bottom: 2px solid ${this.borderColor};
            display: flex;
            align-items: center;
            justify-content: center;
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
    this.shadowRoot.appendChild(style);
  }

  template() {
    return `
            <div id="menu-box">
                <h3>${this.menuTitle}</h3>
            </div>
        `;
  }
}

export default MenuComponent;
