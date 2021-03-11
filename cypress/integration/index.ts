export default it('should be "Initial setup👋"', () => {
  cy.visit("/");
  cy.get("h1").contains("Initial setup👋");
});
