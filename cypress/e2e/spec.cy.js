// describe("Test Group", () => {
//   it("떠든 사람 이름을 입력하면 목록의 맨 끝에 추가된다", () => {
//     /*
//     0. 페이지를 로드한다
//     1/ 사용자가 닉네임을 인풋 상자에 입력한다.
//     2. 버튼을 누른다
//     3/ 목록에 사용자가 입력한 닉네임이 추가된다.
//     */
//     // given

//     const nickname = "메타";
//     // when

//     cy.visit("http://localhost:5173/");
//     cy.get("#nickname").type(nickname);
//     cy.get("#add-button").click();

//     cy.get(".nickname-list").children().last().should("contain.text", nickname);
//   });
// });

describe('컴포넌트 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');
  });
  it('헤더에서 점심 뭐먹지가 잘 렌더링 되는지 확인', () => {
    cy.get('.gnb').should('exist');
    cy.get('.gnb').contains('점심 뭐 먹지');
  });
});
