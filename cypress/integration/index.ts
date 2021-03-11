export default it('should be "Hello Next.js 👋"', () => {
  cy.visit("/");
  cy.get("h1").contains("Initial setup👋");
});
