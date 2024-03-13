// import { CATEGORY } from '../constants/constants';
// import { $ } from '../util/dom';
// import { AddButtonComponent } from './AddButtonComponent';
// import { ModalButtonComponent } from './common/ButtonComponent';
// // import { FilterComponent } from './FilterComponent';

// export function ModalComponent() {
//   const getTemplate = (childere) => {
//     const template = document.createElement('template');
//     template.innerHTML = /*html*/ `
//     <div class="modal">
//     <div class="modal-backdrop"></div>
//     <div class="modal-container">
//       <h2 class="modal-title text-title">새로운 음식점</h2>
//       <form>
//         <!-- 카테고리 -->
//         <div class="form-item form-item--required">
//           <label for="category text-caption">${childeren}</label>

//         </div>

//         <!-- 음식점 이름 -->
//         <div class="form-item form-item--required">
//           <label for="name text-caption">이름</label>
//           <input type="text" name="name" id="name" required />
//         </div>

//         <!-- 거리 -->
//         <div class="form-item form-item--required">
//           <label for="distance text-caption">거리(도보 이동 시간) </label>
//           <select name="distance" id="distance" required>
//             <option value="">선택해 주세요</option>
//             <option value="5">5분 내</option>
//             <option value="10">10분 내</option>
//             <option value="15">15분 내</option>
//             <option value="20">20분 내</option>
//             <option value="30">30분 내</option>
//           </select>
//         </div>

//         <!-- 설명 -->
//         <div class="form-item">
//           <label for="description text-caption">설명</label>
//           <textarea name="description" id="description" cols="30" rows="5"></textarea>
//           <span class="help-text text-caption">메뉴 등 추가 정보를 입력해 주세요.</span>
//         </div>

//         <!-- 링크 -->
//         <div class="form-item">
//           <label for="link text-caption">참고 링크</label>
//           <input type="text" name="link" id="link" />
//           <span class="help-text text-caption"
//             >매장 정보를 확인할 수 있는 링크를 입력해 주세요.</span>
//         </div>

//         <!-- 취소/추가 버튼 -->
//         <div class="button-container">
//      <!--추가하기-->
//         </div>
//       </form>
//     </div>
//   </div>
//   `;
//     const node = template.content.cloneNode(true) as DocumentFragment;
//     return node;
//   };

//   const setEvent = () => {};

//   // <button id="cancleButton" type="button" class="button button--secondary text-caption">취소하기</button>
//   // <button id="submitButton" class="button button--primary text-caption">추가하기</button>
//   return {
//     getTemplate,
//     setEvent
//   };
// }
