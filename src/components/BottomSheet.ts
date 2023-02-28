const BottomSheet = (children: string) => {
  return `
    <div class="modal-backdrop"></div>
    <div class="modal-container">
      ${children}
    </div>
  `;
};

export default BottomSheet;
