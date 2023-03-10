const favoriteIcon = ({ id, favorite }) => {
  return `
    <div data-id="${id}" class="favorite-icon">
      ${favorite ? '★' : '☆'}
    </div>
  `;
};

export default favoriteIcon;
