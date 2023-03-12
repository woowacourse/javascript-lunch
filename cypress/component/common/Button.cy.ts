/// <reference types="cypress" />
import { Button } from '../../../src/components';
import '../../support/component';

describe(Button.name, () => {
  context('Button 컴포넌트를 생성했을 때', () => {
    it('화면에 표시되어야 한다', () => {
      cy.mount('<r-button>테스트 버튼!</r-button>');
      cy.get('r-button').contains('테스트 버튼!');
    });
  });
});
