describe("Test cart", () => {
  it("Check empty cart while signed out", () => {
    cy.visit("/");
    cy.wait(1000);
    cy.get("a[href]").contains("Cart").click();
    cy.get("button")
      .contains("Sign in")
      .should(($button) => {
        const text = $button.text();
        expect(text).to.equal("Sign in");
      });
    cy.get("h2").should(($h2) => {
      const text = $h2.text();
      expect(text).to.equal("Your cart is empty");
    });
    cy.get('div[id="summaryInfo"]').should(($div) => {
      const text = $div.text();
      expect(text).to.equal("Products cost:€0Tax cost:20%Total cost:€0.00");
    });
  });

  it("Check cart remove single item while signed out", () => {
    cy.visit("/");
    cy.wait(1000);
    cy.get('[title="Synthesizers"]').click();
    cy.get('input[type="checkbox"]').check();
    cy.get("button").contains("Add Selected to Cart").click();
    cy.wait(2000);
    cy.get("a[href]").contains("Cart").click();
    cy.wait(4000).then(() => {
      const lsContent: any = JSON.parse(localStorage.getItem("cart"));
      const toRemove = lsContent.items[0].id;
      lsContent.items.splice(0,1);
      localStorage.setItem("cart",localStorage.getItem("cart")+"}}}")
      cy.get(`button[id=${toRemove}]`).click().then(()=>{
        lsContent.items.forEach(element => {
          element.quantity = element.quantity.toString();
        });
        expect(JSON.stringify(JSON.parse(localStorage.getItem("cart")))).to.equal(JSON.stringify(lsContent));
      });
    });
  });

  it("Check cart remove all button while signed out", () => {
    cy.visit("/");
    cy.wait(1000);
    cy.get('[title="Synthesizers"]').click();
    cy.get('input[type="checkbox"]').check();
    cy.get("button").contains("Add Selected to Cart").click();
    cy.wait(2000);
    cy.get("a[href]").contains("Cart").click();
    cy.wait(4000);
    cy.get("button").contains("Remove All").click();
    cy.get('div[id="summaryInfo"]').should(($div) => {
      const text = $div.text();
      expect(text).to.equal("Products cost:€0Tax cost:20%Total cost:€0.00");
      expect(localStorage.getItem("cart")).to.equal('{"items": []}');
    });
  });

  it("Check cart product increase and decrease while signed out", () => {
    cy.visit("/");
    cy.wait(1000);
    cy.get('[title="Synthesizers"]').click();
    cy.get('input[type="checkbox"]').check();
    cy.get("button").contains("Add Selected to Cart").click();
    cy.wait(2000);
    cy.get("a[href]").contains("Cart").click();
    cy.wait(4000).should(() => {
      const lsContent: any = JSON.parse(localStorage.getItem("cart"));

      cy.get('input[id='+lsContent.items[0].id+']').type("2 {leftarrow} {backspace}").trigger("change").should(() => {
      lsContent.items[0].quantity = "2";
      lsContent.items.forEach(element => {
        element.quantity=element.quantity.toString();
      });
      expect(JSON.stringify(JSON.parse(localStorage.getItem("cart")))).to.equal(JSON.stringify(lsContent));
      })

      cy.get('input[id='+lsContent.items[0].id+']').type("1 {rightarrow} {backspace}").trigger("change").should(()=>{
      lsContent.items[0].quantity = "1";
      lsContent.items.forEach(element => {
        element.quantity=element.quantity.toString();
      });
      expect(JSON.stringify(JSON.parse(localStorage.getItem("cart")))).to.equal(JSON.stringify(lsContent));
    })
    });
  });

  it("Check localstorage integrity on cart open while signed out", () => {
    localStorage.setItem("cart", '{items : [');
    cy.visit("/cart");
    cy.wait(1000).then(()=>{
      expect(localStorage.getItem("cart")).to.equal("{items: []}");
    })
  });

  /*it("Check cart remove all button while signed in", () => {
    cy.setCookie(
      "next-auth.session-token",
      "eyJhbGciOiJIUzI1NiIsImtpZCI6IkwyTXFNR1ZSM2JXeUNqcFBhWDJZdGNEMXE0dHBiSms0R0htT3B6UlFEbmMifQ.eyJhY2Nlc3NUb2tlbiI6ImV5SnJhV1FpT2lKUlVYcHlNWGM1WW1OblJFVXdNMjlQYURZeFdUaHdZM3BVZEd0VlN6aFJOWEJoU2taQ1RuY3pOREkwUFNJc0ltRnNaeUk2SWxKVE1qVTJJbjAuZXlKemRXSWlPaUk1TTJWa1lXWTRNaTB6TjJabExUUXlNR1F0WVdZeU9DMDBOR1F6Tmprell6aGlaR1lpTENKbGRtVnVkRjlwWkNJNklqWXhOVGt3T0RFMExXTTVPV1l0TkdabU1DMWlNRE5qTFdWbVpqWmlNR0ZqTkdNd01pSXNJblJ2YTJWdVgzVnpaU0k2SW1GalkyVnpjeUlzSW5OamIzQmxJam9pYjNCbGJtbGtJSEJ5YjJacGJHVWdaVzFoYVd3aUxDSmhkWFJvWDNScGJXVWlPakUyTVRZMU9UTTVPRGdzSW1semN5STZJbWgwZEhCek9sd3ZYQzlqYjJkdWFYUnZMV2xrY0M1bGRTMWpaVzUwY21Gc0xURXVZVzFoZW05dVlYZHpMbU52YlZ3dlpYVXRZMlZ1ZEhKaGJDMHhYMGQwYjB4NlRWRlZPQ0lzSW1WNGNDSTZNVFl4TmpVNU56VTRPQ3dpYVdGMElqb3hOakUyTlRrek9UZzRMQ0oyWlhKemFXOXVJam95TENKcWRHa2lPaUl4TVRFNE5tRmhNUzB6WkRVd0xUUmxZekl0WWpJd1pDMDVaVEV5WkRJNE1EUXlNVGNpTENKamJHbGxiblJmYVdRaU9pSmxaR1YxWkhSclozRnVhRFIwWWpkbk9HeGlibk15Wm1JMUlpd2lkWE5sY201aGJXVWlPaUk1TTJWa1lXWTRNaTB6TjJabExUUXlNR1F0WVdZeU9DMDBOR1F6Tmprell6aGlaR1lpZlEuWF9ScWQwX29OajhMRi0zS21hekJoQ1FiOHJsT3pEY0pNbzVhTWFiaTVuQ2xHcVNYMk4xTnZ0VE1mT2I2UVh6U3AwaWhXV0hwejNlR0UzalRucmZxZnZ1OW1PTGNoQTZfTk9VdWVJYWwzTnF3RlZxcUVvcGZZaHZvc0FvS056NzhJZTkyV3FnUWdNckJOay1qalZwQnNXVV9oLUxuYzlFWXlhNGdua3V0cmJHTnJvT2w5RVVRYlotR001bWtDaHN4eWVET244VW9FNVVldHNHRlBNSE5tS2w0bXhzRkdBRWh3WlNzd0R6eGNiZ2NZYWpUaVR5TVgwYTJCSlAzNEZYLW1CTF9jRGJXaTQ0WXNxb0c5WGMxQjFBaklBTzRwYUN4dGZGYURWZjN5MTY5bllCbF9zV1ltblRrQWpmUDh6WGl5TDVOdjFWcVlFc1l2OXY4NTFMOXVnIiwiZSI6MzE2Mjg5NDc1OTAwMCwicmVmcmVzaFRva2VuIjoiZXlKamRIa2lPaUpLVjFRaUxDSmxibU1pT2lKQk1qVTJSME5OSWl3aVlXeG5Jam9pVWxOQkxVOUJSVkFpZlEuZ3c2WGxUbUpBVFd0UFFEakVhMzVYZUVrOHJ3OFYtRlpENHdHSkxNQ1ItVE1HQlRESzN3cWRwbkt0NzByc242WmEtLU1lWDZyenZnSEhIdXBaQnQ0c2FlRzhfTUNjNFpON25GMHNtcVhTdjBmUkRNY0xPNG5BU0xsdEdLYnJrc0NHVGNYRFRhWmU2Mjgwd3c4aUk1T0FRaUVZSFMwS0tTRk9yZV85Nml3T2cxTmRKNk1wTEtYVThjY1BnWl9WYnY1R1ZGUUc5MU00NlZNTFROdEdnekpQWEljeVpSdUJqa2x0Z2lkak83UmJ0czVkVUtWY1RxeC1tSUUxWWM1anptY283UHFhSDVxbjNGb0Q1SjhqaEVkYkxDT1A3MVRBUVlJaU43XzJybmJRMFdYekZMUWRCN09qdFZMcnlLX3pRY1daenNKRG5PQ0Y5RUxyQW9iLTlXRmpnLlNlSkdEa2pXejFzRFgxSFQuUVJOR1V4aFhhanVuS1Z3a2FiTzE1clZybEt4ZDFJRmtuUXBuWVlJSFNxcXBrbmlMZVFxVFJJTFVDc1Y3QmZIQ0ZuVXBrLVhnOEJKdFg0S0VjUGFMVFFYc0ViQnJXX0RIVXRjWlNkdHNWUE5JVzkzQlVyTGdXbGVaS0kwVFgwNC1lanZyeXJCd29RRzFQOE5OMXJ4OFZmUEk2NE8tWjdVdHFFTGczNVphYjVaTzlSZllZd2U0UWNFek9VMkRsbFh3REhDV0dhVHpET2E1VGhaS1VGbHFzY1JUaDFVLVR2dW5oaVppMmhLelV4SnUxY2thZFRQWW4wNE1BRkduMEJmYTlMQng0eEh2MGV2dE1INGZYcHNGejBDeE96V2tBbjVQbTNhazhFUFhXTE56emxoalVpSzh6Mml5VHEyajJqckY2dDV3TEEzR3QwSm5SWk9ubXBGZEl3VVQxZ0ZOUzEzYjRraWRvVm0wZTluUExyd3RqOE1sZUd0c1hGbTVtZEVrV3RnLTRyMUY0OVRlWjhuem9PT0ZCUXdwWXBpaUNvX0JnTXZqWDN0T04tM09SY0RsSUlDcXZoRkdzbVJySm5ZTHM4YW52ZWVyMV9aSjR4UXBfT1BLZGRfd3ZIZk5wTmtNZFY2M2Q5a2ExZ01VdmU2QXlOdE1GeTdIU3VpenhoRW43SHR6Um5SalFGaE12QXk4VldwTWJXSFNnVTI5c1FrT292UEJqeTVKRWt3b0hyb3JHMXl4SzdXNHdHMHc1M19vbFMwdXFFbjUtM3h1VGdva3NBRnROa0lqV2hiRTJkb3ZTTU1ZRklNQWMxTEV1QTJ1dWJnT0lMUmRsbV9aeXFjblY3eEM1dmtmb3pEeEozcWNfam1KRUQtTGR5UGhDSENaQ2M2ZFZXWHA2QTNFdnRpalFQMzM4RGRNaWxTTUlDdnphNkhSYS1fUnQtVVU5RWZxbFl5MV96TDRxZk5TT3pwOU50b1FQcFVoclZJMUU0QnRpNzlTcm1qcjU5S0RLRTJsSlUxbXAzelZHVTYwUDBpZURYaWFKb2lkV0FTSVZsZU5nbkRwQ1B6aWV1Y2x3QlpNdlBJMHp0eUdMRUVjWEx0U2NXb0pXaWk0NEZtZnRCQ1pmckFGZ3JKellTZm1nQjRjenRYWk5UamZ0SFRydVU5QkZsbnZsc1B4OEI3NWd1RlNRbFdMN0FPWnRTUUxCSmpjbkpHTzlZZGpic2Zxb3hGcTdSUW4xa3dRNlFUb3RPX0Q1ZXFSV1lmOV8ydWJ1SnJJcGplZmstT1FXSzZfQlNJRDQ4X045aHBaZTJ5N0t0bWJ6UWNNS2FNWEZPSUwzRGdPc3V3bElPNnpyVlJvOU5kRUlickhhWDNCLUdVaE5CZGRXbFh1NHZoajA0aEg4QzlETzFxcm40SGd1elRCQ2RKamhIVmJ5YzE4RmZRRVprM3JfelFpa3czWHB0RlZoQWxaQjJCbHJ3RHdFMTU0NFJVZE9SWGRfOURBc3cxcV8yaGM2WUJZbUxqcGdWbDFqek1iRDl3b1I3SGdodmZ2TGI3SmZSQzhwOEExblowWWNRM0pRUk8yRV9kc3FfMzl1YWtCMERMYzZIRHlYSkZ3TnBxdTRBSWRvbUNCWnNuVGhZZ2tTWlNrZVZOQWVFUktKUlo2Yk5mVDJmSmtxa19LcXZveFFoMmF3MDVaV0tNX1RIT2lRbEt5eTYwNDRmR3lnTGJYbVd1blFpZmxFclZUclpZN2FEMkhWd1VDMEhWdlZEM0RaSmE3dzJYV0dyVG1GeUxBR2l6MFAta3lMQS5EejczcVY0MkJUbFpPRldfQlVXNkZRIn0.SqfdbvYWU9ADH9TWtwbmuG5_khKIBrk4nOX5MVMwjFg"
    );
    cy.visit("/cart");
    cy.wait(4000);
    cy.get("button").contains("Remove All").click();
    cy.get("h2").should(($h2) => {
      const text = $h2.text();
      expect(text).to.equal("Your cart is empty");
    });
    cy.get('div[id="summaryInfo"]').should(($div) => {
      const text = $div.text();
      expect(text).to.equal("Products cost:€0Tax cost:20%Total cost:€0.00");
    });
  });*/
});

export {};
