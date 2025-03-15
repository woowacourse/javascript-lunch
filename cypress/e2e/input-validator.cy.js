describe('음식점 등록 폼 테스트', () => {
  let stub;

  beforeEach(() => {
    cy.visit('http://localhost:5173/');
    cy.viewport(1280, 1000);
    stub = cy.stub();
    cy.on('window:alert', stub);
  });

  it('필수 입력값인 카테고리, 이름, 거리를 입력하지 않으면 경고창이 뜬다.', () => {
    cy.get('.gnb__button').click();

    cy.get('button.button--primary')
      .click()
      .then(() => {
        expect(stub).to.have.been.called;
        expect(stub.getCall(0).args[0]).to.equal('카테고리, 이름, 거리 항목은 필수 입력입니다.');
      });
  });

  it('이름을 100자 이상 작성하면 경고창이 뜬다.', () => {
    const name = 'a'.repeat(101);

    cy.get('.gnb__button').click();

    cy.get('select#category').select('한식');
    cy.get('#name').type(name);
    cy.get('#distance').select('5분 내');

    cy.get('button.button--primary')
      .click()
      .then(() => {
        expect(stub).to.have.been.called;
        expect(stub.getCall(0).args[0]).to.equal('이름은 100자 이내로 작성해야 합니다.');
      });
  });

  it('설명을 300자 이상 작성하면 경고창이 뜬다.', () => {
    const discription = 'a'.repeat(301);

    cy.get('.gnb__button').click();

    cy.get('select#category').select('한식');
    cy.get('#name').type('기와집');
    cy.get('#distance').select('5분 내');
    cy.get('#description').type(discription);

    cy.get('button.button--primary')
      .click()
      .then(() => {
        expect(stub).to.have.been.called;
        expect(stub.getCall(0).args[0]).to.equal('설명은 300자 이내로 작성해야 합니다.');
      });
  });

  it('올바르지 않은 url을 작성하면 경고창이 뜬다.', () => {
    const incorrectURL = 'inCorrectURL';

    cy.get('.gnb__button').click();

    cy.get('select#category').select('한식');
    cy.get('#name').type('기와집');
    cy.get('#distance').select('5분 내');
    cy.get('#link').type(incorrectURL);

    cy.get('button.button--primary')
      .click()
      .then(() => {
        expect(stub).to.have.been.called;
        expect(stub.getCall(0).args[0]).to.equal('올바른 url 형식을 입력해주세요.');
      });
  });
});
