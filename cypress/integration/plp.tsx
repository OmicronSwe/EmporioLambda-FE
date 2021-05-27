describe("Test Plp", () => {
  it("Successfully loads a PLP corresponding to a category", () => {
    cy.visit("/plp/Synthesizers");
  });
  it("Successfully loads a PLP of an unexisting category", () => {
    cy.visit("/plp/1234");
    cy.get("h3").should("contain", "Category not found!");
    cy.get("h6").should("contain", "Please try again using the search bar");
    cy.get("h6").should("contain", "or selecting another category from the homepage");
  });
  it("Correctly visiting a category without products", () => {
    cy.visit("/plp/Headphones");
    cy.get("h3").should("contain", "There are no products in this category!");
  });
  it("Correctly visiting a category with at least one product", () => {
    cy.visit("/plp/Synthesizers");
    cy.get("button").should("contain", "View Product");
  });
  it("Check if the view products button is present", () => {
    cy.visit("/plp/Synthesizers");
    cy.get("button").should("contain", "View Product");
  });
  it("Check if the Add Selected to Cart button appears checking listed products", () => {
    cy.visit("/plp/Synthesizers");
    cy.get('[type="checkbox"]').check();
    cy.get("button").should("contain", "Add Selected to Cart");
  });
  it("Check if the searchbar is present", () => {
    cy.visit("/plp/Synthesizers");
    cy.get("#category");
    cy.get("#productValue");
    cy.get("#minPriceValue");
    cy.get("#maxPriceValue");
    cy.get("#searchButton");
  });
  it("Check if the View Product button redirects the user to the product-related PDP", () => {
    cy.visit("/plp/Synthesizers");
    cy.get("div").should("contain", "M-Audio Venom");
    cy.get("div")
      .contains("M-Audio Venom")
      .parent()
      .find("button")
      .contains("View Product")
      .click();
    cy.url().should("include", "/pdp/022fd11f-624a-4f87-b4a1-8547d698027b");
  });

  // test add to cart
  it("Check if the Add to Cart button works correctly", () => {
    cy.visit("/plp/Synthesizers");
    cy.get("div").contains("M-Audio Venom").parent().find("button").contains("Add to Cart").click();
    cy.get("div")
      .contains("M-Audio Venom")
      .parent()
      .find("div")
      .should("contain", "Product added successfully!");
  });
  // test add selected to cart
  it("Check if the Add Selected to Cart button works correctly", () => {
    cy.visit("/plp/Synthesizers");
    cy.get('[type="checkbox"]').check();
    cy.get("button").contains("Add Selected to Cart").click();
    cy.get("div").should("contain", "Products added successfully!");
  });
});

export {};
