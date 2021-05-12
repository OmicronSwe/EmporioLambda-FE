describe("Test profile", () => {
  it("Successfully loads", () => {
    cy.setCookie(
      "next-auth.session-token",
      "eyJhbGciOiJIUzI1NiIsImtpZCI6IkwyTXFNR1ZSM2JXeUNqcFBhWDJZdGNEMXE0dHBiSms0R0htT3B6UlFEbmMifQ.eyJhY2Nlc3NUb2tlbiI6ImV5SnJhV1FpT2lKUlVYcHlNWGM1WW1OblJFVXdNMjlQYURZeFdUaHdZM3BVZEd0VlN6aFJOWEJoU2taQ1RuY3pOREkwUFNJc0ltRnNaeUk2SWxKVE1qVTJJbjAuZXlKemRXSWlPaUl6TVRnMFlURTBNeTAxTlRobUxUUTBOakV0T1dJNU1TMWtNREEwTnpBek4yRTFNMklpTENKamIyZHVhWFJ2T21keWIzVndjeUk2V3lKV1pXNWthWFJ2Y21WQlpHMXBiaUpkTENKcGMzTWlPaUpvZEhSd2N6cGNMMXd2WTI5bmJtbDBieTFwWkhBdVpYVXRZMlZ1ZEhKaGJDMHhMbUZ0WVhwdmJtRjNjeTVqYjIxY0wyVjFMV05sYm5SeVlXd3RNVjlIZEc5TWVrMVJWVGdpTENKMlpYSnphVzl1SWpveUxDSmpiR2xsYm5SZmFXUWlPaUpsWkdWMVpIUnJaM0Z1YURSMFlqZG5PR3hpYm5NeVptSTFJaXdpWlhabGJuUmZhV1FpT2lKbU9EYzBNR0ZtWVMweVpXRTFMVFF6WVRVdE9XTm1NeTFoTVRVNVpUUm1aRFUyWVRnaUxDSjBiMnRsYmw5MWMyVWlPaUpoWTJObGMzTWlMQ0p6WTI5d1pTSTZJbTl3Wlc1cFpDQndjbTltYVd4bElHVnRZV2xzSWl3aVlYVjBhRjkwYVcxbElqb3hOakUyTlRrME1ETTFMQ0psZUhBaU9qRTJNVFkxT1RjMk16VXNJbWxoZENJNk1UWXhOalU1TkRBek5Td2lhblJwSWpvaVl6RTFNMlk0WldVdE1tUXhPQzAwWXpabUxXRXpaamt0Tm1ReE5tWXlNak0xTURreUlpd2lkWE5sY201aGJXVWlPaUl6TVRnMFlURTBNeTAxTlRobUxUUTBOakV0T1dJNU1TMWtNREEwTnpBek4yRTFNMklpZlEuRlR6aUt2alBqY21adWtaT3lYOVd6NGV5U0k4Tk9HZy1rd1VhZFVvMWl5RHNMaVBRZWwwN3VTRWNVaDd6MlFaZ05obkhQdFRCdUJnYmo4MktMOXVlUWRES29kZFI2WGR2M3R4OVRJc3REWHZxc3NjZ2FDM1JYRW5seW5rdEU4Ulp0UWtUZnROMnFIZ2ZpbHJlYkxUekxDV21DS0hCMkQ2MnJLZWUwOXFpOWNKTzdBd2FRaURxUDdLQmdFdXgtU1g3eXdPdG1fLTZteVhpTHljZlFzT0lGN1laZTZjTnVvcUtEYkZQc0RsUDdRMGd1aFlpamFpQWhKVW1mdU0tdFN2c1VOZUhtQl9PXzZMek9ET1JGN0JESjZfdUhGOElnTlBvQWZFTjRZNDRKZFpRYi1uYzFDN0VaVlJRSnplZGxxaGtJY0wzbGdkRmoxV0JsRWx6Y1lQRTlRIiwiZSI6MzE2Mjg5NDc1OTAwMCwicmVmcmVzaFRva2VuIjoiZXlKamRIa2lPaUpLVjFRaUxDSmxibU1pT2lKQk1qVTJSME5OSWl3aVlXeG5Jam9pVWxOQkxVOUJSVkFpZlEuWW5WY1hwQWJEblhfcG13SW9tbGE1REhPLWZFZm9pSE9ERzhtaDdLa3JxaVEtY05rYnFwb1A4RXg1dnBvX0xCRXhRdUloZVBzcHVubE9heGtHeXE0NkIyekFyU2VPekE4UnFrcGx2U3hpejZIblRvRE5uU0M5bjZ1enRCUy1SSDFTYmpWY0ZfVGdhNzRtOHlxN0hVUlZ4QXFhZmtfU2lVSGdWcmVLX255bzRzc29IX2ZVcFNWZ214a0d5WnV0aGljM2FURGdnQy16endNR01YRkZNTjhndGk5c25DZDRSNnlVejV3T0ZwbHgxRHB0OEI1ODlsMWdaYjVIWGRKMTZRWjZWU1luSHg1aVRrbk1VUmtOcTNnbmpvNnAyX2N0Zlh3U0JEWkJTSWxRV1JaNy02cDBMQkpESnBRZEdVMFdXcVpfWkRCazJNX0lNTU5lcUdlTFp5ZS13LjJjOEVCcFdRNzlFSFFMU24uUU5ZLVlsVnFFdWpiRkJhTmxrbENpMG5jcnZNdWgyRnlHR0NGLU85YTRib3dlMkd0QlMxS2UtalE1MmZIVVlSXzJjVldudmFndm5IX29lNDdOeW1xRFhvSkgzQ1ktX0lxSlQ1dFhMeWJPYjdaRU9JS21BUDBqaFViZGkxSmxDSnNrUkFmbWY1RkstUzNXQXRCSkF3ai1uMWthSm1tUWJtLU8wRU5Ga3puQTI5dTZMdHRJNWJUY290QjlrMTI2QktXbHBxcTRVeWozNUNOWU4wN0RFYl9JM2puS2c3N1FMSENaOUhibVRyUEdBTndyaEpyUGs5QmZiNU15V2Nnd1dHdjZpRXpJUHZQTHNCaEN5ZjItM01PUDV1WWJRcmVnSXJEYnprNW9VZFc0YVl6RzNraS1TeVZicGE4Q3d3a25IaTEzRXVoUnRHNTdxUTY1d2RVWmZZOW9xVnJKRnZjckZOVmJaYmxMTlA4bDhBZUJrS1hoZFlORTVfNUc2SE1Hd0duQ1E3aFhIbEdWbGVaSGZ3N3VyYnlJWlYtd3FuVzh1Y2NHQlRyRUlZMWlWTjViZU9KNnh1TnoxdnAza2F0LVVHY01ZTHl3WHNWeWJqeFhJLVhEU3VGb3JyU0s1aFdJNmx3TTJnenBreWc4eE9DVkZSQ001UVFBUmt2MVp1LUxhU0t1TXRCY3hlYWthSWZrdTI5aGdBTWtJaTlVMU1ERS1rdlZKeWdPVHBrMHZYUUlPRFcySmpleXBsLTVJS1Vla2ZLRjBudUw5SGNwZER4R1hncnkwbkZHMFA1eEhlZ0NiY25yb1BoaFdLVm50T1lCMi1reGVseEhVX3N0UjhkQlIxdFoxX2Rfd0J2Vzc2TEpzMWgzRFVzLTgzMjBtVlhmMWtmQzFRVkE4Sk9UeS1lMG1SUWp6c1lDalB1aG9IUnFZaW5JdGlRamxpUFQ4RlhKY1VZSXVxcFlqenZqa05EX1hwZFJ2OXI2VE5VUFJXQWc2Z2UzbzhEZWw2OHJmdEU1bnFhS1ZRR29hVmJ4V0t4MVhYY1VDcVd2c0ZBOVoxdmNBa1FZY1JBWTB3VTRMQTBMY3J1LVM2M19ObFFvQ3BTTldGUU5nQjl3NEFiN3U2SFlVRXNKRlcwZUN5em9wX3hOT2VJRmZLSVJiVnBmUU1ib3lnSDN4UHFqZnVHZ3Q0WDI0SzRWc3FISHR3VHU3dGJyYk1DUVRWTE93YW10ZHU4MTQyMXFEdWlzbTRJd1BVZi1vV2JPQjc4Q01PYWhodmhzbDMtdmdneEN2LVBBSnMxblFDSTFlSGxXdVoxVEE5TnpjaVZsdDJfYUdXWW1Qc2NxLUlWU2hhT003X1FIbkk3al9aRHlJcTg2VFhNOVJmb29Ld2tqY1pPWUV2OW55WVl6bjJxVXpKa3E4eld1b0o0UHk0Sk9EUEdyeWFQUXZ5T0NVYjdQY1NwT0xkR21BYUtSZ2Y1SWE3cFhFM0xkSjhnRl9lc1RyZENBTW1hWHhSSFgwLVB0Y0Q2b19Cb3R5LU5haFlsS2t4b2QycHVoM3pONjRfYkJoNllrdjFOaWdobEpwMjNnb1FuUTNKbVJ0VE9SUXZkSTBRNXJfQWQ3M3BkdEZHVlVpV2ZXOVVfNFZta3NnanRKMjB5LVJoa1R6TzFyZGp3S29sYTBnbzBTUklRMV9FbmpLM2s2TUFfMzc2V2kybWlaZ2NNTVhrSkszRW1BbkVPYjRFNlF3T0ZVam56bXNqWGJHTTdFcWN3UVRKR3FTX1pnNHFoRWZwdXR2WkRmTGtLaFI2Z1REdW56dy5CeUlkRXJ4eUVTWkVzX0U5cVRjekp3In0.O-K6E8V6SwQjhy8jMzrhAFSKE2JtWNWXb7vngtD6fGc"
    );
    cy.visit("/profile");
  });
  it("Check profile section", () => {
    cy.setCookie(
      "next-auth.session-token",
      "eyJhbGciOiJIUzI1NiIsImtpZCI6IkwyTXFNR1ZSM2JXeUNqcFBhWDJZdGNEMXE0dHBiSms0R0htT3B6UlFEbmMifQ.eyJhY2Nlc3NUb2tlbiI6ImV5SnJhV1FpT2lKUlVYcHlNWGM1WW1OblJFVXdNMjlQYURZeFdUaHdZM3BVZEd0VlN6aFJOWEJoU2taQ1RuY3pOREkwUFNJc0ltRnNaeUk2SWxKVE1qVTJJbjAuZXlKemRXSWlPaUl6TVRnMFlURTBNeTAxTlRobUxUUTBOakV0T1dJNU1TMWtNREEwTnpBek4yRTFNMklpTENKamIyZHVhWFJ2T21keWIzVndjeUk2V3lKV1pXNWthWFJ2Y21WQlpHMXBiaUpkTENKcGMzTWlPaUpvZEhSd2N6cGNMMXd2WTI5bmJtbDBieTFwWkhBdVpYVXRZMlZ1ZEhKaGJDMHhMbUZ0WVhwdmJtRjNjeTVqYjIxY0wyVjFMV05sYm5SeVlXd3RNVjlIZEc5TWVrMVJWVGdpTENKMlpYSnphVzl1SWpveUxDSmpiR2xsYm5SZmFXUWlPaUpsWkdWMVpIUnJaM0Z1YURSMFlqZG5PR3hpYm5NeVptSTFJaXdpWlhabGJuUmZhV1FpT2lKbU9EYzBNR0ZtWVMweVpXRTFMVFF6WVRVdE9XTm1NeTFoTVRVNVpUUm1aRFUyWVRnaUxDSjBiMnRsYmw5MWMyVWlPaUpoWTJObGMzTWlMQ0p6WTI5d1pTSTZJbTl3Wlc1cFpDQndjbTltYVd4bElHVnRZV2xzSWl3aVlYVjBhRjkwYVcxbElqb3hOakUyTlRrME1ETTFMQ0psZUhBaU9qRTJNVFkxT1RjMk16VXNJbWxoZENJNk1UWXhOalU1TkRBek5Td2lhblJwSWpvaVl6RTFNMlk0WldVdE1tUXhPQzAwWXpabUxXRXpaamt0Tm1ReE5tWXlNak0xTURreUlpd2lkWE5sY201aGJXVWlPaUl6TVRnMFlURTBNeTAxTlRobUxUUTBOakV0T1dJNU1TMWtNREEwTnpBek4yRTFNMklpZlEuRlR6aUt2alBqY21adWtaT3lYOVd6NGV5U0k4Tk9HZy1rd1VhZFVvMWl5RHNMaVBRZWwwN3VTRWNVaDd6MlFaZ05obkhQdFRCdUJnYmo4MktMOXVlUWRES29kZFI2WGR2M3R4OVRJc3REWHZxc3NjZ2FDM1JYRW5seW5rdEU4Ulp0UWtUZnROMnFIZ2ZpbHJlYkxUekxDV21DS0hCMkQ2MnJLZWUwOXFpOWNKTzdBd2FRaURxUDdLQmdFdXgtU1g3eXdPdG1fLTZteVhpTHljZlFzT0lGN1laZTZjTnVvcUtEYkZQc0RsUDdRMGd1aFlpamFpQWhKVW1mdU0tdFN2c1VOZUhtQl9PXzZMek9ET1JGN0JESjZfdUhGOElnTlBvQWZFTjRZNDRKZFpRYi1uYzFDN0VaVlJRSnplZGxxaGtJY0wzbGdkRmoxV0JsRWx6Y1lQRTlRIiwiZSI6MzE2Mjg5NDc1OTAwMCwicmVmcmVzaFRva2VuIjoiZXlKamRIa2lPaUpLVjFRaUxDSmxibU1pT2lKQk1qVTJSME5OSWl3aVlXeG5Jam9pVWxOQkxVOUJSVkFpZlEuWW5WY1hwQWJEblhfcG13SW9tbGE1REhPLWZFZm9pSE9ERzhtaDdLa3JxaVEtY05rYnFwb1A4RXg1dnBvX0xCRXhRdUloZVBzcHVubE9heGtHeXE0NkIyekFyU2VPekE4UnFrcGx2U3hpejZIblRvRE5uU0M5bjZ1enRCUy1SSDFTYmpWY0ZfVGdhNzRtOHlxN0hVUlZ4QXFhZmtfU2lVSGdWcmVLX255bzRzc29IX2ZVcFNWZ214a0d5WnV0aGljM2FURGdnQy16endNR01YRkZNTjhndGk5c25DZDRSNnlVejV3T0ZwbHgxRHB0OEI1ODlsMWdaYjVIWGRKMTZRWjZWU1luSHg1aVRrbk1VUmtOcTNnbmpvNnAyX2N0Zlh3U0JEWkJTSWxRV1JaNy02cDBMQkpESnBRZEdVMFdXcVpfWkRCazJNX0lNTU5lcUdlTFp5ZS13LjJjOEVCcFdRNzlFSFFMU24uUU5ZLVlsVnFFdWpiRkJhTmxrbENpMG5jcnZNdWgyRnlHR0NGLU85YTRib3dlMkd0QlMxS2UtalE1MmZIVVlSXzJjVldudmFndm5IX29lNDdOeW1xRFhvSkgzQ1ktX0lxSlQ1dFhMeWJPYjdaRU9JS21BUDBqaFViZGkxSmxDSnNrUkFmbWY1RkstUzNXQXRCSkF3ai1uMWthSm1tUWJtLU8wRU5Ga3puQTI5dTZMdHRJNWJUY290QjlrMTI2QktXbHBxcTRVeWozNUNOWU4wN0RFYl9JM2puS2c3N1FMSENaOUhibVRyUEdBTndyaEpyUGs5QmZiNU15V2Nnd1dHdjZpRXpJUHZQTHNCaEN5ZjItM01PUDV1WWJRcmVnSXJEYnprNW9VZFc0YVl6RzNraS1TeVZicGE4Q3d3a25IaTEzRXVoUnRHNTdxUTY1d2RVWmZZOW9xVnJKRnZjckZOVmJaYmxMTlA4bDhBZUJrS1hoZFlORTVfNUc2SE1Hd0duQ1E3aFhIbEdWbGVaSGZ3N3VyYnlJWlYtd3FuVzh1Y2NHQlRyRUlZMWlWTjViZU9KNnh1TnoxdnAza2F0LVVHY01ZTHl3WHNWeWJqeFhJLVhEU3VGb3JyU0s1aFdJNmx3TTJnenBreWc4eE9DVkZSQ001UVFBUmt2MVp1LUxhU0t1TXRCY3hlYWthSWZrdTI5aGdBTWtJaTlVMU1ERS1rdlZKeWdPVHBrMHZYUUlPRFcySmpleXBsLTVJS1Vla2ZLRjBudUw5SGNwZER4R1hncnkwbkZHMFA1eEhlZ0NiY25yb1BoaFdLVm50T1lCMi1reGVseEhVX3N0UjhkQlIxdFoxX2Rfd0J2Vzc2TEpzMWgzRFVzLTgzMjBtVlhmMWtmQzFRVkE4Sk9UeS1lMG1SUWp6c1lDalB1aG9IUnFZaW5JdGlRamxpUFQ4RlhKY1VZSXVxcFlqenZqa05EX1hwZFJ2OXI2VE5VUFJXQWc2Z2UzbzhEZWw2OHJmdEU1bnFhS1ZRR29hVmJ4V0t4MVhYY1VDcVd2c0ZBOVoxdmNBa1FZY1JBWTB3VTRMQTBMY3J1LVM2M19ObFFvQ3BTTldGUU5nQjl3NEFiN3U2SFlVRXNKRlcwZUN5em9wX3hOT2VJRmZLSVJiVnBmUU1ib3lnSDN4UHFqZnVHZ3Q0WDI0SzRWc3FISHR3VHU3dGJyYk1DUVRWTE93YW10ZHU4MTQyMXFEdWlzbTRJd1BVZi1vV2JPQjc4Q01PYWhodmhzbDMtdmdneEN2LVBBSnMxblFDSTFlSGxXdVoxVEE5TnpjaVZsdDJfYUdXWW1Qc2NxLUlWU2hhT003X1FIbkk3al9aRHlJcTg2VFhNOVJmb29Ld2tqY1pPWUV2OW55WVl6bjJxVXpKa3E4eld1b0o0UHk0Sk9EUEdyeWFQUXZ5T0NVYjdQY1NwT0xkR21BYUtSZ2Y1SWE3cFhFM0xkSjhnRl9lc1RyZENBTW1hWHhSSFgwLVB0Y0Q2b19Cb3R5LU5haFlsS2t4b2QycHVoM3pONjRfYkJoNllrdjFOaWdobEpwMjNnb1FuUTNKbVJ0VE9SUXZkSTBRNXJfQWQ3M3BkdEZHVlVpV2ZXOVVfNFZta3NnanRKMjB5LVJoa1R6TzFyZGp3S29sYTBnbzBTUklRMV9FbmpLM2s2TUFfMzc2V2kybWlaZ2NNTVhrSkszRW1BbkVPYjRFNlF3T0ZVam56bXNqWGJHTTdFcWN3UVRKR3FTX1pnNHFoRWZwdXR2WkRmTGtLaFI2Z1REdW56dy5CeUlkRXJ4eUVTWkVzX0U5cVRjekp3In0.O-K6E8V6SwQjhy8jMzrhAFSKE2JtWNWXb7vngtD6fGc"
    );
    cy.visit("/profile");
    cy.get("#formPlainTextName").should("have.value", "Testin1");
    cy.get("#formPlainTextFamilyName").should("have.value", "Fronzilliani");
    cy.get("#formPlainTextEmail").should("have.value", "test@test.com");
    cy.get("#formPlainTextAddress").should("have.value", "Via San Francesco");
  });
  it("Check if the edit/delete buttons are present", () => {
    cy.setCookie(
      "next-auth.session-token",
      "eyJhbGciOiJIUzI1NiIsImtpZCI6IkwyTXFNR1ZSM2JXeUNqcFBhWDJZdGNEMXE0dHBiSms0R0htT3B6UlFEbmMifQ.eyJhY2Nlc3NUb2tlbiI6ImV5SnJhV1FpT2lKUlVYcHlNWGM1WW1OblJFVXdNMjlQYURZeFdUaHdZM3BVZEd0VlN6aFJOWEJoU2taQ1RuY3pOREkwUFNJc0ltRnNaeUk2SWxKVE1qVTJJbjAuZXlKemRXSWlPaUl6TVRnMFlURTBNeTAxTlRobUxUUTBOakV0T1dJNU1TMWtNREEwTnpBek4yRTFNMklpTENKamIyZHVhWFJ2T21keWIzVndjeUk2V3lKV1pXNWthWFJ2Y21WQlpHMXBiaUpkTENKcGMzTWlPaUpvZEhSd2N6cGNMMXd2WTI5bmJtbDBieTFwWkhBdVpYVXRZMlZ1ZEhKaGJDMHhMbUZ0WVhwdmJtRjNjeTVqYjIxY0wyVjFMV05sYm5SeVlXd3RNVjlIZEc5TWVrMVJWVGdpTENKMlpYSnphVzl1SWpveUxDSmpiR2xsYm5SZmFXUWlPaUpsWkdWMVpIUnJaM0Z1YURSMFlqZG5PR3hpYm5NeVptSTFJaXdpWlhabGJuUmZhV1FpT2lKbU9EYzBNR0ZtWVMweVpXRTFMVFF6WVRVdE9XTm1NeTFoTVRVNVpUUm1aRFUyWVRnaUxDSjBiMnRsYmw5MWMyVWlPaUpoWTJObGMzTWlMQ0p6WTI5d1pTSTZJbTl3Wlc1cFpDQndjbTltYVd4bElHVnRZV2xzSWl3aVlYVjBhRjkwYVcxbElqb3hOakUyTlRrME1ETTFMQ0psZUhBaU9qRTJNVFkxT1RjMk16VXNJbWxoZENJNk1UWXhOalU1TkRBek5Td2lhblJwSWpvaVl6RTFNMlk0WldVdE1tUXhPQzAwWXpabUxXRXpaamt0Tm1ReE5tWXlNak0xTURreUlpd2lkWE5sY201aGJXVWlPaUl6TVRnMFlURTBNeTAxTlRobUxUUTBOakV0T1dJNU1TMWtNREEwTnpBek4yRTFNMklpZlEuRlR6aUt2alBqY21adWtaT3lYOVd6NGV5U0k4Tk9HZy1rd1VhZFVvMWl5RHNMaVBRZWwwN3VTRWNVaDd6MlFaZ05obkhQdFRCdUJnYmo4MktMOXVlUWRES29kZFI2WGR2M3R4OVRJc3REWHZxc3NjZ2FDM1JYRW5seW5rdEU4Ulp0UWtUZnROMnFIZ2ZpbHJlYkxUekxDV21DS0hCMkQ2MnJLZWUwOXFpOWNKTzdBd2FRaURxUDdLQmdFdXgtU1g3eXdPdG1fLTZteVhpTHljZlFzT0lGN1laZTZjTnVvcUtEYkZQc0RsUDdRMGd1aFlpamFpQWhKVW1mdU0tdFN2c1VOZUhtQl9PXzZMek9ET1JGN0JESjZfdUhGOElnTlBvQWZFTjRZNDRKZFpRYi1uYzFDN0VaVlJRSnplZGxxaGtJY0wzbGdkRmoxV0JsRWx6Y1lQRTlRIiwiZSI6MzE2Mjg5NDc1OTAwMCwicmVmcmVzaFRva2VuIjoiZXlKamRIa2lPaUpLVjFRaUxDSmxibU1pT2lKQk1qVTJSME5OSWl3aVlXeG5Jam9pVWxOQkxVOUJSVkFpZlEuWW5WY1hwQWJEblhfcG13SW9tbGE1REhPLWZFZm9pSE9ERzhtaDdLa3JxaVEtY05rYnFwb1A4RXg1dnBvX0xCRXhRdUloZVBzcHVubE9heGtHeXE0NkIyekFyU2VPekE4UnFrcGx2U3hpejZIblRvRE5uU0M5bjZ1enRCUy1SSDFTYmpWY0ZfVGdhNzRtOHlxN0hVUlZ4QXFhZmtfU2lVSGdWcmVLX255bzRzc29IX2ZVcFNWZ214a0d5WnV0aGljM2FURGdnQy16endNR01YRkZNTjhndGk5c25DZDRSNnlVejV3T0ZwbHgxRHB0OEI1ODlsMWdaYjVIWGRKMTZRWjZWU1luSHg1aVRrbk1VUmtOcTNnbmpvNnAyX2N0Zlh3U0JEWkJTSWxRV1JaNy02cDBMQkpESnBRZEdVMFdXcVpfWkRCazJNX0lNTU5lcUdlTFp5ZS13LjJjOEVCcFdRNzlFSFFMU24uUU5ZLVlsVnFFdWpiRkJhTmxrbENpMG5jcnZNdWgyRnlHR0NGLU85YTRib3dlMkd0QlMxS2UtalE1MmZIVVlSXzJjVldudmFndm5IX29lNDdOeW1xRFhvSkgzQ1ktX0lxSlQ1dFhMeWJPYjdaRU9JS21BUDBqaFViZGkxSmxDSnNrUkFmbWY1RkstUzNXQXRCSkF3ai1uMWthSm1tUWJtLU8wRU5Ga3puQTI5dTZMdHRJNWJUY290QjlrMTI2QktXbHBxcTRVeWozNUNOWU4wN0RFYl9JM2puS2c3N1FMSENaOUhibVRyUEdBTndyaEpyUGs5QmZiNU15V2Nnd1dHdjZpRXpJUHZQTHNCaEN5ZjItM01PUDV1WWJRcmVnSXJEYnprNW9VZFc0YVl6RzNraS1TeVZicGE4Q3d3a25IaTEzRXVoUnRHNTdxUTY1d2RVWmZZOW9xVnJKRnZjckZOVmJaYmxMTlA4bDhBZUJrS1hoZFlORTVfNUc2SE1Hd0duQ1E3aFhIbEdWbGVaSGZ3N3VyYnlJWlYtd3FuVzh1Y2NHQlRyRUlZMWlWTjViZU9KNnh1TnoxdnAza2F0LVVHY01ZTHl3WHNWeWJqeFhJLVhEU3VGb3JyU0s1aFdJNmx3TTJnenBreWc4eE9DVkZSQ001UVFBUmt2MVp1LUxhU0t1TXRCY3hlYWthSWZrdTI5aGdBTWtJaTlVMU1ERS1rdlZKeWdPVHBrMHZYUUlPRFcySmpleXBsLTVJS1Vla2ZLRjBudUw5SGNwZER4R1hncnkwbkZHMFA1eEhlZ0NiY25yb1BoaFdLVm50T1lCMi1reGVseEhVX3N0UjhkQlIxdFoxX2Rfd0J2Vzc2TEpzMWgzRFVzLTgzMjBtVlhmMWtmQzFRVkE4Sk9UeS1lMG1SUWp6c1lDalB1aG9IUnFZaW5JdGlRamxpUFQ4RlhKY1VZSXVxcFlqenZqa05EX1hwZFJ2OXI2VE5VUFJXQWc2Z2UzbzhEZWw2OHJmdEU1bnFhS1ZRR29hVmJ4V0t4MVhYY1VDcVd2c0ZBOVoxdmNBa1FZY1JBWTB3VTRMQTBMY3J1LVM2M19ObFFvQ3BTTldGUU5nQjl3NEFiN3U2SFlVRXNKRlcwZUN5em9wX3hOT2VJRmZLSVJiVnBmUU1ib3lnSDN4UHFqZnVHZ3Q0WDI0SzRWc3FISHR3VHU3dGJyYk1DUVRWTE93YW10ZHU4MTQyMXFEdWlzbTRJd1BVZi1vV2JPQjc4Q01PYWhodmhzbDMtdmdneEN2LVBBSnMxblFDSTFlSGxXdVoxVEE5TnpjaVZsdDJfYUdXWW1Qc2NxLUlWU2hhT003X1FIbkk3al9aRHlJcTg2VFhNOVJmb29Ld2tqY1pPWUV2OW55WVl6bjJxVXpKa3E4eld1b0o0UHk0Sk9EUEdyeWFQUXZ5T0NVYjdQY1NwT0xkR21BYUtSZ2Y1SWE3cFhFM0xkSjhnRl9lc1RyZENBTW1hWHhSSFgwLVB0Y0Q2b19Cb3R5LU5haFlsS2t4b2QycHVoM3pONjRfYkJoNllrdjFOaWdobEpwMjNnb1FuUTNKbVJ0VE9SUXZkSTBRNXJfQWQ3M3BkdEZHVlVpV2ZXOVVfNFZta3NnanRKMjB5LVJoa1R6TzFyZGp3S29sYTBnbzBTUklRMV9FbmpLM2s2TUFfMzc2V2kybWlaZ2NNTVhrSkszRW1BbkVPYjRFNlF3T0ZVam56bXNqWGJHTTdFcWN3UVRKR3FTX1pnNHFoRWZwdXR2WkRmTGtLaFI2Z1REdW56dy5CeUlkRXJ4eUVTWkVzX0U5cVRjekp3In0.O-K6E8V6SwQjhy8jMzrhAFSKE2JtWNWXb7vngtD6fGc"
    );
    cy.visit("/profile");
    cy.get("button").contains("Edit");
    cy.get("button").contains("Delete");
  });
  it("Check if edit form, submit/cancel buttons are present", () => {
    cy.setCookie(
      "next-auth.session-token",
      "eyJhbGciOiJIUzI1NiIsImtpZCI6IkwyTXFNR1ZSM2JXeUNqcFBhWDJZdGNEMXE0dHBiSms0R0htT3B6UlFEbmMifQ.eyJhY2Nlc3NUb2tlbiI6ImV5SnJhV1FpT2lKUlVYcHlNWGM1WW1OblJFVXdNMjlQYURZeFdUaHdZM3BVZEd0VlN6aFJOWEJoU2taQ1RuY3pOREkwUFNJc0ltRnNaeUk2SWxKVE1qVTJJbjAuZXlKemRXSWlPaUl6TVRnMFlURTBNeTAxTlRobUxUUTBOakV0T1dJNU1TMWtNREEwTnpBek4yRTFNMklpTENKamIyZHVhWFJ2T21keWIzVndjeUk2V3lKV1pXNWthWFJ2Y21WQlpHMXBiaUpkTENKcGMzTWlPaUpvZEhSd2N6cGNMMXd2WTI5bmJtbDBieTFwWkhBdVpYVXRZMlZ1ZEhKaGJDMHhMbUZ0WVhwdmJtRjNjeTVqYjIxY0wyVjFMV05sYm5SeVlXd3RNVjlIZEc5TWVrMVJWVGdpTENKMlpYSnphVzl1SWpveUxDSmpiR2xsYm5SZmFXUWlPaUpsWkdWMVpIUnJaM0Z1YURSMFlqZG5PR3hpYm5NeVptSTFJaXdpWlhabGJuUmZhV1FpT2lKbU9EYzBNR0ZtWVMweVpXRTFMVFF6WVRVdE9XTm1NeTFoTVRVNVpUUm1aRFUyWVRnaUxDSjBiMnRsYmw5MWMyVWlPaUpoWTJObGMzTWlMQ0p6WTI5d1pTSTZJbTl3Wlc1cFpDQndjbTltYVd4bElHVnRZV2xzSWl3aVlYVjBhRjkwYVcxbElqb3hOakUyTlRrME1ETTFMQ0psZUhBaU9qRTJNVFkxT1RjMk16VXNJbWxoZENJNk1UWXhOalU1TkRBek5Td2lhblJwSWpvaVl6RTFNMlk0WldVdE1tUXhPQzAwWXpabUxXRXpaamt0Tm1ReE5tWXlNak0xTURreUlpd2lkWE5sY201aGJXVWlPaUl6TVRnMFlURTBNeTAxTlRobUxUUTBOakV0T1dJNU1TMWtNREEwTnpBek4yRTFNMklpZlEuRlR6aUt2alBqY21adWtaT3lYOVd6NGV5U0k4Tk9HZy1rd1VhZFVvMWl5RHNMaVBRZWwwN3VTRWNVaDd6MlFaZ05obkhQdFRCdUJnYmo4MktMOXVlUWRES29kZFI2WGR2M3R4OVRJc3REWHZxc3NjZ2FDM1JYRW5seW5rdEU4Ulp0UWtUZnROMnFIZ2ZpbHJlYkxUekxDV21DS0hCMkQ2MnJLZWUwOXFpOWNKTzdBd2FRaURxUDdLQmdFdXgtU1g3eXdPdG1fLTZteVhpTHljZlFzT0lGN1laZTZjTnVvcUtEYkZQc0RsUDdRMGd1aFlpamFpQWhKVW1mdU0tdFN2c1VOZUhtQl9PXzZMek9ET1JGN0JESjZfdUhGOElnTlBvQWZFTjRZNDRKZFpRYi1uYzFDN0VaVlJRSnplZGxxaGtJY0wzbGdkRmoxV0JsRWx6Y1lQRTlRIiwiZSI6MzE2Mjg5NDc1OTAwMCwicmVmcmVzaFRva2VuIjoiZXlKamRIa2lPaUpLVjFRaUxDSmxibU1pT2lKQk1qVTJSME5OSWl3aVlXeG5Jam9pVWxOQkxVOUJSVkFpZlEuWW5WY1hwQWJEblhfcG13SW9tbGE1REhPLWZFZm9pSE9ERzhtaDdLa3JxaVEtY05rYnFwb1A4RXg1dnBvX0xCRXhRdUloZVBzcHVubE9heGtHeXE0NkIyekFyU2VPekE4UnFrcGx2U3hpejZIblRvRE5uU0M5bjZ1enRCUy1SSDFTYmpWY0ZfVGdhNzRtOHlxN0hVUlZ4QXFhZmtfU2lVSGdWcmVLX255bzRzc29IX2ZVcFNWZ214a0d5WnV0aGljM2FURGdnQy16endNR01YRkZNTjhndGk5c25DZDRSNnlVejV3T0ZwbHgxRHB0OEI1ODlsMWdaYjVIWGRKMTZRWjZWU1luSHg1aVRrbk1VUmtOcTNnbmpvNnAyX2N0Zlh3U0JEWkJTSWxRV1JaNy02cDBMQkpESnBRZEdVMFdXcVpfWkRCazJNX0lNTU5lcUdlTFp5ZS13LjJjOEVCcFdRNzlFSFFMU24uUU5ZLVlsVnFFdWpiRkJhTmxrbENpMG5jcnZNdWgyRnlHR0NGLU85YTRib3dlMkd0QlMxS2UtalE1MmZIVVlSXzJjVldudmFndm5IX29lNDdOeW1xRFhvSkgzQ1ktX0lxSlQ1dFhMeWJPYjdaRU9JS21BUDBqaFViZGkxSmxDSnNrUkFmbWY1RkstUzNXQXRCSkF3ai1uMWthSm1tUWJtLU8wRU5Ga3puQTI5dTZMdHRJNWJUY290QjlrMTI2QktXbHBxcTRVeWozNUNOWU4wN0RFYl9JM2puS2c3N1FMSENaOUhibVRyUEdBTndyaEpyUGs5QmZiNU15V2Nnd1dHdjZpRXpJUHZQTHNCaEN5ZjItM01PUDV1WWJRcmVnSXJEYnprNW9VZFc0YVl6RzNraS1TeVZicGE4Q3d3a25IaTEzRXVoUnRHNTdxUTY1d2RVWmZZOW9xVnJKRnZjckZOVmJaYmxMTlA4bDhBZUJrS1hoZFlORTVfNUc2SE1Hd0duQ1E3aFhIbEdWbGVaSGZ3N3VyYnlJWlYtd3FuVzh1Y2NHQlRyRUlZMWlWTjViZU9KNnh1TnoxdnAza2F0LVVHY01ZTHl3WHNWeWJqeFhJLVhEU3VGb3JyU0s1aFdJNmx3TTJnenBreWc4eE9DVkZSQ001UVFBUmt2MVp1LUxhU0t1TXRCY3hlYWthSWZrdTI5aGdBTWtJaTlVMU1ERS1rdlZKeWdPVHBrMHZYUUlPRFcySmpleXBsLTVJS1Vla2ZLRjBudUw5SGNwZER4R1hncnkwbkZHMFA1eEhlZ0NiY25yb1BoaFdLVm50T1lCMi1reGVseEhVX3N0UjhkQlIxdFoxX2Rfd0J2Vzc2TEpzMWgzRFVzLTgzMjBtVlhmMWtmQzFRVkE4Sk9UeS1lMG1SUWp6c1lDalB1aG9IUnFZaW5JdGlRamxpUFQ4RlhKY1VZSXVxcFlqenZqa05EX1hwZFJ2OXI2VE5VUFJXQWc2Z2UzbzhEZWw2OHJmdEU1bnFhS1ZRR29hVmJ4V0t4MVhYY1VDcVd2c0ZBOVoxdmNBa1FZY1JBWTB3VTRMQTBMY3J1LVM2M19ObFFvQ3BTTldGUU5nQjl3NEFiN3U2SFlVRXNKRlcwZUN5em9wX3hOT2VJRmZLSVJiVnBmUU1ib3lnSDN4UHFqZnVHZ3Q0WDI0SzRWc3FISHR3VHU3dGJyYk1DUVRWTE93YW10ZHU4MTQyMXFEdWlzbTRJd1BVZi1vV2JPQjc4Q01PYWhodmhzbDMtdmdneEN2LVBBSnMxblFDSTFlSGxXdVoxVEE5TnpjaVZsdDJfYUdXWW1Qc2NxLUlWU2hhT003X1FIbkk3al9aRHlJcTg2VFhNOVJmb29Ld2tqY1pPWUV2OW55WVl6bjJxVXpKa3E4eld1b0o0UHk0Sk9EUEdyeWFQUXZ5T0NVYjdQY1NwT0xkR21BYUtSZ2Y1SWE3cFhFM0xkSjhnRl9lc1RyZENBTW1hWHhSSFgwLVB0Y0Q2b19Cb3R5LU5haFlsS2t4b2QycHVoM3pONjRfYkJoNllrdjFOaWdobEpwMjNnb1FuUTNKbVJ0VE9SUXZkSTBRNXJfQWQ3M3BkdEZHVlVpV2ZXOVVfNFZta3NnanRKMjB5LVJoa1R6TzFyZGp3S29sYTBnbzBTUklRMV9FbmpLM2s2TUFfMzc2V2kybWlaZ2NNTVhrSkszRW1BbkVPYjRFNlF3T0ZVam56bXNqWGJHTTdFcWN3UVRKR3FTX1pnNHFoRWZwdXR2WkRmTGtLaFI2Z1REdW56dy5CeUlkRXJ4eUVTWkVzX0U5cVRjekp3In0.O-K6E8V6SwQjhy8jMzrhAFSKE2JtWNWXb7vngtD6fGc"
    );
    cy.visit("/profile");
    cy.get("button").contains("Edit").click();
    cy.wait(1000);
    cy.get("#formPlainTextName").should("have.value", "Testin1");
    cy.get("#formPlainTextFamilyName").should("have.value", "Fronzilliani");
    cy.get("#formPlainTextEmail").should("have.value", "test@test.com");
    cy.get("#formPlainTextAddress").should("have.value", "Via San Francesco");

    cy.get("#profileName");
    cy.get("#profileFamilyName");
    cy.get("#profileEmail");
    cy.get("#profileAddress");

    cy.get("button").contains("Submit");
    cy.get("button").contains("Cancel");
  });
  it("Check if the Cancel button in profile edit page redirect to the profile page", () => {
    cy.setCookie(
      "next-auth.session-token",
      "eyJhbGciOiJIUzI1NiIsImtpZCI6IkwyTXFNR1ZSM2JXeUNqcFBhWDJZdGNEMXE0dHBiSms0R0htT3B6UlFEbmMifQ.eyJhY2Nlc3NUb2tlbiI6ImV5SnJhV1FpT2lKUlVYcHlNWGM1WW1OblJFVXdNMjlQYURZeFdUaHdZM3BVZEd0VlN6aFJOWEJoU2taQ1RuY3pOREkwUFNJc0ltRnNaeUk2SWxKVE1qVTJJbjAuZXlKemRXSWlPaUl6TVRnMFlURTBNeTAxTlRobUxUUTBOakV0T1dJNU1TMWtNREEwTnpBek4yRTFNMklpTENKamIyZHVhWFJ2T21keWIzVndjeUk2V3lKV1pXNWthWFJ2Y21WQlpHMXBiaUpkTENKcGMzTWlPaUpvZEhSd2N6cGNMMXd2WTI5bmJtbDBieTFwWkhBdVpYVXRZMlZ1ZEhKaGJDMHhMbUZ0WVhwdmJtRjNjeTVqYjIxY0wyVjFMV05sYm5SeVlXd3RNVjlIZEc5TWVrMVJWVGdpTENKMlpYSnphVzl1SWpveUxDSmpiR2xsYm5SZmFXUWlPaUpsWkdWMVpIUnJaM0Z1YURSMFlqZG5PR3hpYm5NeVptSTFJaXdpWlhabGJuUmZhV1FpT2lKbU9EYzBNR0ZtWVMweVpXRTFMVFF6WVRVdE9XTm1NeTFoTVRVNVpUUm1aRFUyWVRnaUxDSjBiMnRsYmw5MWMyVWlPaUpoWTJObGMzTWlMQ0p6WTI5d1pTSTZJbTl3Wlc1cFpDQndjbTltYVd4bElHVnRZV2xzSWl3aVlYVjBhRjkwYVcxbElqb3hOakUyTlRrME1ETTFMQ0psZUhBaU9qRTJNVFkxT1RjMk16VXNJbWxoZENJNk1UWXhOalU1TkRBek5Td2lhblJwSWpvaVl6RTFNMlk0WldVdE1tUXhPQzAwWXpabUxXRXpaamt0Tm1ReE5tWXlNak0xTURreUlpd2lkWE5sY201aGJXVWlPaUl6TVRnMFlURTBNeTAxTlRobUxUUTBOakV0T1dJNU1TMWtNREEwTnpBek4yRTFNMklpZlEuRlR6aUt2alBqY21adWtaT3lYOVd6NGV5U0k4Tk9HZy1rd1VhZFVvMWl5RHNMaVBRZWwwN3VTRWNVaDd6MlFaZ05obkhQdFRCdUJnYmo4MktMOXVlUWRES29kZFI2WGR2M3R4OVRJc3REWHZxc3NjZ2FDM1JYRW5seW5rdEU4Ulp0UWtUZnROMnFIZ2ZpbHJlYkxUekxDV21DS0hCMkQ2MnJLZWUwOXFpOWNKTzdBd2FRaURxUDdLQmdFdXgtU1g3eXdPdG1fLTZteVhpTHljZlFzT0lGN1laZTZjTnVvcUtEYkZQc0RsUDdRMGd1aFlpamFpQWhKVW1mdU0tdFN2c1VOZUhtQl9PXzZMek9ET1JGN0JESjZfdUhGOElnTlBvQWZFTjRZNDRKZFpRYi1uYzFDN0VaVlJRSnplZGxxaGtJY0wzbGdkRmoxV0JsRWx6Y1lQRTlRIiwiZSI6MzE2Mjg5NDc1OTAwMCwicmVmcmVzaFRva2VuIjoiZXlKamRIa2lPaUpLVjFRaUxDSmxibU1pT2lKQk1qVTJSME5OSWl3aVlXeG5Jam9pVWxOQkxVOUJSVkFpZlEuWW5WY1hwQWJEblhfcG13SW9tbGE1REhPLWZFZm9pSE9ERzhtaDdLa3JxaVEtY05rYnFwb1A4RXg1dnBvX0xCRXhRdUloZVBzcHVubE9heGtHeXE0NkIyekFyU2VPekE4UnFrcGx2U3hpejZIblRvRE5uU0M5bjZ1enRCUy1SSDFTYmpWY0ZfVGdhNzRtOHlxN0hVUlZ4QXFhZmtfU2lVSGdWcmVLX255bzRzc29IX2ZVcFNWZ214a0d5WnV0aGljM2FURGdnQy16endNR01YRkZNTjhndGk5c25DZDRSNnlVejV3T0ZwbHgxRHB0OEI1ODlsMWdaYjVIWGRKMTZRWjZWU1luSHg1aVRrbk1VUmtOcTNnbmpvNnAyX2N0Zlh3U0JEWkJTSWxRV1JaNy02cDBMQkpESnBRZEdVMFdXcVpfWkRCazJNX0lNTU5lcUdlTFp5ZS13LjJjOEVCcFdRNzlFSFFMU24uUU5ZLVlsVnFFdWpiRkJhTmxrbENpMG5jcnZNdWgyRnlHR0NGLU85YTRib3dlMkd0QlMxS2UtalE1MmZIVVlSXzJjVldudmFndm5IX29lNDdOeW1xRFhvSkgzQ1ktX0lxSlQ1dFhMeWJPYjdaRU9JS21BUDBqaFViZGkxSmxDSnNrUkFmbWY1RkstUzNXQXRCSkF3ai1uMWthSm1tUWJtLU8wRU5Ga3puQTI5dTZMdHRJNWJUY290QjlrMTI2QktXbHBxcTRVeWozNUNOWU4wN0RFYl9JM2puS2c3N1FMSENaOUhibVRyUEdBTndyaEpyUGs5QmZiNU15V2Nnd1dHdjZpRXpJUHZQTHNCaEN5ZjItM01PUDV1WWJRcmVnSXJEYnprNW9VZFc0YVl6RzNraS1TeVZicGE4Q3d3a25IaTEzRXVoUnRHNTdxUTY1d2RVWmZZOW9xVnJKRnZjckZOVmJaYmxMTlA4bDhBZUJrS1hoZFlORTVfNUc2SE1Hd0duQ1E3aFhIbEdWbGVaSGZ3N3VyYnlJWlYtd3FuVzh1Y2NHQlRyRUlZMWlWTjViZU9KNnh1TnoxdnAza2F0LVVHY01ZTHl3WHNWeWJqeFhJLVhEU3VGb3JyU0s1aFdJNmx3TTJnenBreWc4eE9DVkZSQ001UVFBUmt2MVp1LUxhU0t1TXRCY3hlYWthSWZrdTI5aGdBTWtJaTlVMU1ERS1rdlZKeWdPVHBrMHZYUUlPRFcySmpleXBsLTVJS1Vla2ZLRjBudUw5SGNwZER4R1hncnkwbkZHMFA1eEhlZ0NiY25yb1BoaFdLVm50T1lCMi1reGVseEhVX3N0UjhkQlIxdFoxX2Rfd0J2Vzc2TEpzMWgzRFVzLTgzMjBtVlhmMWtmQzFRVkE4Sk9UeS1lMG1SUWp6c1lDalB1aG9IUnFZaW5JdGlRamxpUFQ4RlhKY1VZSXVxcFlqenZqa05EX1hwZFJ2OXI2VE5VUFJXQWc2Z2UzbzhEZWw2OHJmdEU1bnFhS1ZRR29hVmJ4V0t4MVhYY1VDcVd2c0ZBOVoxdmNBa1FZY1JBWTB3VTRMQTBMY3J1LVM2M19ObFFvQ3BTTldGUU5nQjl3NEFiN3U2SFlVRXNKRlcwZUN5em9wX3hOT2VJRmZLSVJiVnBmUU1ib3lnSDN4UHFqZnVHZ3Q0WDI0SzRWc3FISHR3VHU3dGJyYk1DUVRWTE93YW10ZHU4MTQyMXFEdWlzbTRJd1BVZi1vV2JPQjc4Q01PYWhodmhzbDMtdmdneEN2LVBBSnMxblFDSTFlSGxXdVoxVEE5TnpjaVZsdDJfYUdXWW1Qc2NxLUlWU2hhT003X1FIbkk3al9aRHlJcTg2VFhNOVJmb29Ld2tqY1pPWUV2OW55WVl6bjJxVXpKa3E4eld1b0o0UHk0Sk9EUEdyeWFQUXZ5T0NVYjdQY1NwT0xkR21BYUtSZ2Y1SWE3cFhFM0xkSjhnRl9lc1RyZENBTW1hWHhSSFgwLVB0Y0Q2b19Cb3R5LU5haFlsS2t4b2QycHVoM3pONjRfYkJoNllrdjFOaWdobEpwMjNnb1FuUTNKbVJ0VE9SUXZkSTBRNXJfQWQ3M3BkdEZHVlVpV2ZXOVVfNFZta3NnanRKMjB5LVJoa1R6TzFyZGp3S29sYTBnbzBTUklRMV9FbmpLM2s2TUFfMzc2V2kybWlaZ2NNTVhrSkszRW1BbkVPYjRFNlF3T0ZVam56bXNqWGJHTTdFcWN3UVRKR3FTX1pnNHFoRWZwdXR2WkRmTGtLaFI2Z1REdW56dy5CeUlkRXJ4eUVTWkVzX0U5cVRjekp3In0.O-K6E8V6SwQjhy8jMzrhAFSKE2JtWNWXb7vngtD6fGc"
    );
    cy.visit("/profile");
    cy.get("button").contains("Edit").click();
    cy.wait(1000);
    cy.get("button").contains("Cancel").click();
    cy.url().should("eq", "http://localhost:3000/profile");
  });
});

export {};
