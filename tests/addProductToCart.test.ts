// import { expect, test } from "@playwright/test"
// import BookPages from "../app.bookcart.pages/bookPage"
// import HeaderPage from "../app.bookcart.pages/headerPage"
// import LoginPage from "../app.bookcart.pages/loginPage"
import * as data from "../utils/testdata/loginUser.json"
import test, { expect } from "../app.book.base/myFixtures"

test.describe("Add product to cart", () => {
    test("Add a book - Unauthenticated user", async ({ books, header, page, browserName }) => {

        //It will slow the execution of this test tripple of given default time
        // you can't use it in beforeAll() and AfterAll() hooks
        test.slow();

        //Below skip command will not execute the test if the browser is firefox
        test.skip(browserName === "firefox", "This test should not run on firefox");

        // const books = new BookPages(page)
        // const header = new HeaderPage(page)

        await test.step("Navigate to home", async () => {
            await page.goto("/")
        })

        await test.step("Search for 'All of us with wings' and add to cart", async () => {
            await books.addBookToCart("All of us with wings")
            const cartValue = await header.getCartValue()
            expect(Number(cartValue)).toBeGreaterThan(0)
        })

    })

    test("Add a book - authenticated user", async ({ login, books, header }) => {
        // const books = new BookPages(page)
        // const login = new LoginPage(page)
        // const header = new HeaderPage(page)

        await test.step("Navigate to login page", async () => {
            await login.navigateToLoginPage();
        })

        await test.step("Login with valid credentials", async () => {
            await login.loginUser(data.userName, data.password)
            await header.verifyLoginSuccess();
        })


        await test.step("Search and add 'the Hookup' to the cart", async () => {
            await books.addBookToCart("the Hookup")
            const cartValue = await header.getCartValue()
            expect(Number(cartValue)).toBeGreaterThan(0)
        })

        await test.step("Logout", async () => {
            await header.logoutUser()
        })

        await test.step("Verify added book is there after login", async () => {
            await login.loginUser(data.userName, data.password)
            await header.verifyLoginSuccess();
            const cartValue = await header.getCartValue()
            expect(Number(cartValue)).toBeGreaterThan(0)
        })

        await test.step("Logout Again", async () => {
            await header.logoutUser()
        })
    })

})