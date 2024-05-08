import FormSteps from '../FormSteps.vue';

describe('FormSteps', () => {
  it('playground', () => {
    cy.mount(FormSteps, { props: { msg: 'Step' } });
  });

  it('renders properly', () => {
    cy.mount(FormSteps, { props: { msg: 'Hello Cypress' } });
    cy.get('h1').should('contain', 'Step');
  });
});
