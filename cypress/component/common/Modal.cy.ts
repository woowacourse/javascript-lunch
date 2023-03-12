/// <reference types="cypress" />
import { Modal } from '../../../src/components';
import '../../../src/components/common/Button';
import '../../support/component';

describe(Modal.name, () => {
  context('Modal 컴포넌트를 열었을 때', () => {
    it('모달 내용이 잘 표시되어야 한다', () => {
      cy.mount(`
        <r-modal>
          <h1 slot="header">제목</h1>
          <p slot="content">내용</p>
          <div slot="actions">
            <r-button full variant="primary">확인</r-button>
          </div>
        </r-modal>
      `);

      cy.get<Modal>('r-modal')
        .should(([$modal]) => $modal instanceof Modal)
        .then(([$modal]) => $modal.open());

      cy.get('r-modal')
        .should('be.visible')
        .within(() => {
          cy.get('[slot="header"]').contains('제목');
          cy.get('[slot="content"]').contains('내용');
          cy.get('[slot="actions"]').get('r-button');
        });
    });
  });

  context('Modal 컴포넌트를 닫았을 떄', () => {
    it('화면에서 사라져야 한다', () => {
      cy.mount(`
        <r-modal>
          <h1 slot="header">제목</h1>
        </r-modal>
      `);

      cy.get<Modal>('r-modal')
        .should(([$modal]) => $modal instanceof Modal)
        .should('not.be.visible')
        .then(([$modal]) => $modal.open())
        .should('be.visible')
        .then(([$modal]) => $modal.close())
        .should('not.be.visible');
    });
  });
});
