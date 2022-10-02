/// <reference types="cypress" />

describe("weather", () => {
  it("show the Perez data", () => {
    cy.fixture("weather.json").then((data) => {
      cy.intercept("**/forecast**", data);
      cy.visit("/");

      cy.get("select").should("have.value", "perez");
      cy.get("h2").should("have.text", data.city.name);
      cy.get("ul > li:first-of-type").should(
        "have.text",
        "2/10/2022 Min: 21 °C, Max: 25 °C"
      );
    });
  });
});
