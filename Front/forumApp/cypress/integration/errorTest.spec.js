it('on error should show error message', function() {
    cy.server();
    cy.route({
      method: 'GET',
      url: '/api/forum/getFora',
      status: 500,
      response: 'ERROR'
    });
    cy.visit('/forum/list');
    cy.get('[data-cy=appError]').should('be.visible');
});