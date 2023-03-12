import RFormControl from './RFormControl';

class RSelect extends RFormControl {
  renderTemplate(): string {
    return `
      <style>
        select {
          padding: 8px;
          margin: 6px 0;

          border: 1px solid var(--grey-200);
          border-radius: 8px;

          font-size: 16px;
          width: 100%
        }
      </style>

      <select>
        ${
          !this.hasAttribute('values')
            ? []
            : this.getAttribute('values')
                ?.split(',')
                .map((option) => {
                  return `
            <option value="${option}">${option}</option>
          `;
                })
                .join('')
        }
      </select>
    `;
  }
}

customElements.define('r-select', RSelect);

export default RSelect;