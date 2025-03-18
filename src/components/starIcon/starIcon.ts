interface StarIconProps {
  className: string;
  isFill: boolean;
  fillColor?: string;
}

const filled = {
  true: "M16 23.0267L24.24 28L22.0533 18.6267L29.3333 12.32L19.7467 11.5067L16 2.66666L12.2533 11.5067L2.66666 12.32L9.94666 18.6267L7.76 28L16 23.0267Z",
  false:
    "M29.3333 12.32L19.7467 11.4934L16 2.66669L12.2533 11.5067L2.66666 12.32L9.94666 18.6267L7.76 28L16 23.0267L24.24 28L22.0667 18.6267L29.3333 12.32ZM16 20.5334L10.9867 23.56L12.32 17.8534L7.89333 14.0134L13.7333 13.5067L16 8.13335L18.28 13.52L24.12 14.0267L19.6933 17.8667L21.0267 23.5734L16 20.5334Z",
};

function createStarIcon({
  className,
  isFill,
  fillColor = "#EC4A0A",
}: StarIconProps) {
  const filledKey = String(isFill) as keyof typeof filled;
  const starIcon = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  starIcon.classList.add(className);
  starIcon.innerHTML = `
    <g id="Star" clip-path="url(#clip0_9959_430)">
      <path id="Vector" d="${filled[filledKey]}" fill="${fillColor}"/>
    </g>
    <defs>
      <clipPath id="clip0_9959_430">
      <rect width="32" height="32" fill="white"/>
      </clipPath>
    </defs>
  `;

  return starIcon;
}

export default createStarIcon;
