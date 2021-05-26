describe("Test pdp", () => {
  it("Successfully loads a PDP", () => {
    cy.visit("/pdp/ff60640d-e92e-4f06-a7cd-79a570474dda");
    cy.get("h1").should("contain", "Product Details");
  });
  it("Successfully loads a PDP of an unexisting product", () => {
    cy.visit("/pdp/1234");
    cy.get("h3").should("contain", "Product not found!");
    cy.get("h6").should("contain", "Please try again using the search bar");
  });
  it("Check product info", () => {
    cy.visit("/pdp/ff60640d-e92e-4f06-a7cd-79a570474dda");
    cy.get("#imgProduct").should(
      "have.attr",
      "src",
      "https://local-imagebucket.s3-eu-central-1.amazonaws.com/9669d5bd-c448-4c03-a47b-bfe43586c904.jpg"
    );
    cy.get("#formPlainTextID").should("have.value", "ff60640d-e92e-4f06-a7cd-79a570474dda");
    cy.get("#formPlainTextName").should("have.value", "Korg Monologue");
    cy.get("#formPlainTextDescription").should("have.value", "Synthesizer Korg Monologue");
    cy.get("#formPlainTextCategory").should("have.value", "Synthesizers");
    cy.get("#formPlainTextPrice").should("have.value", "260.50€");
  });
  it("Check add cart", () => {
    cy.visit("/pdp/ff60640d-e92e-4f06-a7cd-79a570474dda");
    cy.get("button").contains("Add to cart").click();
    cy.get("#AlertSuccess").contains("Product added to cart successfully!");
  });
});

export {};
