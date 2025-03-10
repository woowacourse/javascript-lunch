import Component from "./core/Component.js";

const Header = ({ title, ariaLabel, dataTestId, iconImageSource, alt }) => {
  return /*html*/ `
    <header class="gnb">
      <h1 class="gnb__title text-title">${title}</h1>
      <button type="button" class="gnb__button" aria-label=${ariaLabel} data-testid=${dataTestId}>
        <img src=${iconImageSource} alt=${alt}>
      </button>
    </header>
  `;
};

export default Header;
