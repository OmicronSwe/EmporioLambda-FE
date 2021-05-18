describe("Test plp", () => {
  it("Successfully loads", () => {
    cy.url("/");
  });

  it("Check if the view products btn is present", () => {
    cy.visit("/plp/Speakers");
    cy.get("button").contains("View Product").click();
  });
  it("Check if the Add selected products to Cart btn is present", () => {
    cy.visit("/plp/Speakers");
    cy.get("button").contains("Add selected products to Cart");
  });

  it("Check if filter by price form is present", () => {
    cy.visit("/plp/Speakers");
    cy.get("#PriceMin");
    cy.get("#PriceMax");
    cy.get("button").contains("Filter");
  });


  it("Check if category contains items", () => {
    cy.visit("/plp/Speakers");
    cy.wait(1000);
    cy.get("button").contains("View Product");
  });


});

export {};

