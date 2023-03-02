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
            <option value="">선택해 주세요</option>
            <option value="5">5분 내</option>
            <option value="10">10분 내</option>
            <option value="15">15분 내</option>
            <option value="20">20분 내</option>
            <option value="30">30분 내</option>
        </select>
    `;
  }
}

customElements.define('r-select', RSelect);

export default RSelect;
