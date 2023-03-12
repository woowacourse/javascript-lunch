/// <reference types="cypress" />
import { Tabs } from '../../../src/components';
import '../../support/component';

describe(Tabs.name, () => {
  context('Tabs 컴포넌트를 생성했을 때', () => {
    it('Tab 내의 내용이 잘 표시되어야 한다', () => {
      cy.mount(`
        <r-tabs>
          <div slot="tab-1">
            <h1>첫 번째 컨텐츠</h1>
          </div>
        </r-tabs>
      `);

      cy.get<Tabs>('r-tabs')
        .should(([$tabs]) => $tabs instanceof Tabs)
        .then(([$tabs]) => $tabs.setTabItems([{ label: '첫 번째', value: 'tab-1' }]));

      cy.get('r-tabs').find('[slot="tab-1"]').should('be.visible').contains('첫 번째 컨텐츠');
    });
  });
});
