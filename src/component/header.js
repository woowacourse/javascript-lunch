import { $ } from '../utils/selector.js'

function createHeader({parent, left, right}){
  const header = $(parent);

  const leftElement = item[left];
  const rightElement = item[right];

  eventHandler[left]?.();
  eventHandler[right]?.();

  header.append(leftElement, rightElement);
}

// REFACTOR: 앱 이름 상수로 분리
const item = {
  logo() {
    const h1 = document.createElement("h1");
    h1.className = "gnb__title text-title";
    h1.textContent = "점심 뭐 먹지";
    return h1
  },

  add() {
    const button = document.createElement("button");
  
    button.type = "button";
    button.className = "gnb__button";
    button.setAttribute("aria-label", "음식점 추가");
  
    const img = document.createElement("img");
  
    img.src = "./add-button.png";
    img.alt = "음식점 추가";
  
    button.appendChild(img);
    
    return button;
  }
};

const eventHandler = {
  add(element) {
    element.addEventListener('click', () => {
      // 모달을 연다.
      // 모달안에 어떤 내용을 렌더할지도 이곳에 적는다.
    })
  }
}

export default createHeader;