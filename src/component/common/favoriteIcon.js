const favoriteIcon = ({ id, favorite }) => {
  return `
    <div data-id="${id}" class="favorite-icon ${favorite ? 'favorite' : ''}">
      ${favorite ? '★' : '☆'}
    </div>
  `;
};

export default favoriteIcon;
