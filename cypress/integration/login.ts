export default describe("Test login no session", () => {
  it("Check if the signin button is present", () => {
    cy.visit("/");
    cy.get("button").contains("Sign in").should("exist");
  });
  it("Check if a link to the merchant dashboard is present", () => {
    cy.visit("/");
    cy.get("a").contains("Merchant Dashboard").should("not.exist");
  });
});
