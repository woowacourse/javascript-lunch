/// <reference types="cypress" />
import { Header } from '../../../src/components';
import '../../support/component';

describe(Header.name, () => {
  context('Header 컴포넌트를 생성했을 때', () => {
    it('타이틀이 잘 표시되어야 한다', () => {
      cy.mount('<r-header title="점심 뭐 먹지"></r-header>');
      cy.get('r-header').contains('점심 뭐 먹지');
    });
  });

  context('Header 컴포넌트를 생성했을 때', () => {
    it('타이틀이 잘 표시되어야 한다', () => {
      cy.mount('<r-header title="점심 뭐 먹지"></r-header>');
      cy.get('r-header').contains('점심 뭐 먹지');
    });
  });

  context('Header의 actions 슬롯에 버튼을 추가하였을 떄', () => {
    it('잘 표시되어야 한다', () => {
      cy.mount(`
        <r-header title="점심 뭐 먹지">
          <button slot="actions">홈으로</button>
        </r-header>
      `);
      cy.get('r-header').shadow().get('button').contains('홈으로');
    });
  });
});
