describe("Test search bar", () => {
  it("Check if the search bar is present", () => {
    cy.visit("/");
    cy.get("#searchBar").should("be.visible");
  });

  it("Checks if it routes in the correct format", () => {
    cy.visit("/");
    cy.get("#productValue").type("test");
    cy.get("#minPriceValue").type("10");
    cy.get("#maxPriceValue").type("100");
    cy.get("#category").click();
    cy.get(".dropdown-item").contains("Amplifiers").click();
    cy.get("#searchButton").click();

    cy.url().should("include", "/search?name=test&minprice=10&maxprice=100&category=Amplifiers");
  });
});

export {};
