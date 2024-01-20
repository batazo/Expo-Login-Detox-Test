const { sleep } = require("./utils/sleep");

const defaultSleep = 3000;

const testId = Object.freeze({
   inputs: {
      email: "email-input",
      password: "password-input",
   },
   buttons: {
      login: "login-button",
      logout: "logout-button",
      back: "back-button",
   },
   texts: {
      loginSuccess: "login-success-text",
      loginWrong: "login-wrong-text",
   },
});

async function tryLogin({ email = "", password = "" }) {
   await element(by.id(testId.inputs.email)).typeText(email);
   await element(by.id(testId.inputs.password)).typeText(password);
   await sleep(defaultSleep);
   await element(by.id(testId.buttons.login)).tap();
   await sleep(defaultSleep);
}

describe("Login screen tests", () => {
   beforeAll(async () => {
      await device.launchApp();
   });

   it("Login input form visible", async () => {
      await sleep(defaultSleep);
      await expect(element(by.id(testId.inputs.email))).toBeVisible();
      await expect(element(by.id(testId.inputs.password))).toBeVisible();
      await expect(element(by.id(testId.buttons.login))).toBeVisible();
   });

   it("Wrong login test", async () => {
      await tryLogin({ email: "WrongUser", password: "WrongPassword" });

      await expect(element(by.id(testId.texts.loginWrong))).toBeVisible();
      await expect(element(by.id(testId.buttons.back))).toBeVisible();
   });

   it("Go back test", async () => {
      await element(by.id(testId.buttons.back)).tap();
      await sleep(defaultSleep);
   });

   it("Good login test", async () => {
      await tryLogin({ email: "batazo", password: "123" });

      await expect(element(by.id(testId.texts.loginSuccess))).toBeVisible();
      await expect(element(by.id(testId.buttons.logout))).toBeVisible();
   });

   it("Logout test", async () => {
      await element(by.id(testId.buttons.logout)).tap();
      await sleep(defaultSleep);
   });
});
