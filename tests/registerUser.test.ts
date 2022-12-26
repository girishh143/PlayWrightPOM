import test from "@playwright/test"
import RegisterPage from "../app.bookcart.pages/registerPage"
import Assert from "../app.book.base/asserts"
import * as data from "../utils/testdata/registerUser.json"

test("Register User", async ({ page }) => {

    const register = new RegisterPage(page);
    const assert = new Assert(page)
    //This will create Unique user name always
    const userName = data.userName + Date.now().toString();
    console.log("New User id = ", userName)

    await test.step("Goto Application", async () => {
        await register.navigateToRegisterPage();
    })

    await test.step("Create User", async () => {
        await register.registerUser(data.firstName, data.lastName, userName,
            data.password, data.confirmPassword, "m");
    })

    await test.step("Confirm registration is success", async () => {
        await assert.assertURL("login")

    })
    // Just to see the execution
    // await page.waitForTimeout(5000)
})