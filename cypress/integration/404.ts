describe("Test 404 Page", () => {
  it("Correctly viting of 404 page due to incorrect user search", () => {
    cy.visit("/123", { failOnStatusCode: false });
    cy.get("h2").should("contain", "That page cannot be found!");
  });
  it("Check if 404 page elements are present", () => {
    cy.visit("/123", { failOnStatusCode: false });
    cy.get("h1").should("contain", "Oooops");
    cy.get("h2").should("contain", "That page cannot be found!");
    cy.get("a").should("contain", "Homepage");
    cy.get("#searchBar").should("be.visible");
  });
});

export {};
