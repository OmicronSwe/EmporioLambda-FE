describe("Test plp", () => {
  it("Successfully loads", () => {
    cy.visit("/plp");
  });
  it("Check category info", () => {
    cy.visit("/plp/Speakers");
    cy.get("#formPlainTextName").should("have.value", "Speakers");
  });
  it("Check View Products Btn", () => {
    cy.visit("#");
    cy.get("button").contains("View Products").click();
    cy.get("#AlertSuccess").contains("Category opened successfully!");
  });
});

export {};