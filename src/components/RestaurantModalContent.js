function createModalContent({ name, distance, description, image, isFavorite, link }) {
  const favoriteIcon = isFavorite ? 'favorite-icon-filled.png' : 'favorite-icon-lined.png';

  return `
    <div class="modal-header">
      <img src="${image}" alt="카테고리 아이콘" class="category-icon">
      <h2 class="modal-title text-title">${name}</h2>
      <img src="${favoriteIcon}" alt="즐겨찾기 아이콘" class="favorite-star">
    </div>
    <p><strong>거리:</strong> ${distance}</p>
    <p><strong>설명:</strong> ${description}</p>
    <p><a href="${link}" target="_blank" class="restaurant-modal-link">🔗 매장 정보 보기</a></p>
  `;
}

export default createModalContent;
