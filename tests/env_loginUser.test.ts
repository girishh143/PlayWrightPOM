
// import { expect, test } from "@playwright/test"
// import HeaderPage from "../app.bookcart.pages/headerPage";
// import LoginPage from "../app.bookcart.pages/loginPage";
//var data = require('../utils/testdata/loginUser.json');
import * as data from "../utils/testdata/loginUser.json"
//import ENV from "../env";
import test, { expect } from "../app.book.base/myFixtures"

test.describe("Login Scenario", () => {

    test("Invalid Login", async ({ login }) => {
        // const login = new LoginPage(page)

        await test.step("Navigate to login page", async () => {
            await login.navigateToLoginPage();
        })

        await test.step("Enter valid username and invalid password", async () => {
            await login.loginUser(data.userName, data.invalidPassword)
            const msg = await login.getErrorMessage();
            expect(msg).toContain("incorrect")
        })

        await test.step("Enter invalid username and valid password", async () => {
            await login.loginUser(data.invalidUserName, data.password)
            const msg = await login.getErrorMessage();
            expect(msg).toContain("Username or Password is incorrect.")
        })

        await test.step("Enter invalid username and invalid password", async () => {
            await login.loginUser(data.invalidUserName, data.invalidPassword)
            const msg = await login.getErrorMessage();
            expect(msg).toContain("Username or Password is incorrect.")
        })
    })

    test("Valid Login @TagloginTest", async ({ login, header }) => {

        // const login = new LoginPage(page)
        // const header = new HeaderPage(page)

        await test.step("Navigate to login page", async () => {
            await login.navigateToLoginPage();
        })

        await test.step("Login with valid credentials", async () => {
            await login.loginUser(data.userName, data.password)
            // console.log("Username ====> ", ENV.URNAME)
            // console.log("Password ====> ", ENV.PWD)
            //  await login.loginUser(ENV.URNAME, ENV.PWD)
            await header.verifyLoginSuccess();
        })

        test.step("Logout User", async () => {
            await header.logoutUser();

        })

    })
});