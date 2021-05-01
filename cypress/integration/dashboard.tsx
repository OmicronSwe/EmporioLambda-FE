describe("Test dashboard", () => {
    it("Check if the add new product button is present", () => {
      cy.visit("/dashboard");
      cy.get("button").contains("Add new product");
    });
  });

  export {};