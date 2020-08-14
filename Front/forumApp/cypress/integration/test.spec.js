it('mock fora get', function() {
    cy.server();
    cy.route({
      method: 'GET',
      url: '/api/Forum/getFora',
      status: 200,
      response: 'fixture:fora.json'
    });
    cy.visit('/forum/list');
    cy.get('[data-cy=forumDiv]').should('have.length', 4);
  });