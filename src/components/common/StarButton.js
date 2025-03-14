export function StarButton(isSelected) {
  return `
        <div>
            <button type="button">
                <svg width="28" height="26" viewBox="0 0 28 26" fill=${
                  isSelected === true ? "#EC4A0A" : "none"
                } xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 21.0267L22.24 26L20.0534 16.6267L27.3334 10.32L17.7467 9.50666L14 0.666656L10.2534 9.50666L0.666687 10.32L7.94669 16.6267L5.76002 26L14 21.0267Z" fill="none"/>
                    <path d="M14.5168 20.1705L14 19.8586L13.4833 20.1705L7.27228 23.9192L8.92054 16.8538L9.05766 16.266L8.60146 15.8708L3.11285 11.116L10.3379 10.5031L10.9388 10.4521L11.1741 9.89688L14 3.22925L16.826 9.89688L17.0613 10.4521L17.6621 10.5031L24.8872 11.116L19.3986 15.8708L18.9424 16.266L19.0795 16.8538L20.7278 23.9192L14.5168 20.1705Z" stroke="#EC4A0A" stroke-opacity="0.5" stroke-width="2"/>
                </svg>
            </button>
        </div>
    `;
}
