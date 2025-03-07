const Distance = (minute) => {
  const distance = document.createElement("span");
  distance.classList.add("restaurant__distance", "text-body");
  distance.textContent = `캠퍼스부터 ${minute}분 내`;

  return distance;
};

export default Distance;
