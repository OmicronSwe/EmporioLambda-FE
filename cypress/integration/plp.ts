describe("Test plp", () => {
  it("Successfully loads", () => {
    cy.url("/");
  });

  it("Check view products btn", () => {
    cy.visit("/plp/Speakers");
    cy.get("button").contains("View Product").click();
  });
  it("Check if category contains items", () => {
    cy.visit("/plp/Speakers");
    cy.wait(1000);
    cy.get("button").contains("View Product");
  });
  it("Check if the Add selected products to Cart is present", () => {
    cy.visit("/plp/Speakers");
    cy.get("button").contains("Add selected products to Cart");
  });


  


  

});

export {};

