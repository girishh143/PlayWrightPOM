import BookPages from "../app.bookcart.pages/bookPage"
import HeaderPage from "../app.bookcart.pages/headerPage"
import LoginPage from "../app.bookcart.pages/loginPage"
import RegisterPage from "../app.bookcart.pages/registerPage"
import Assert from "../app.book.base/asserts"


import { test as baseTest } from "@playwright/test"

const test = baseTest.extend<{
    login: LoginPage;
    header: HeaderPage;
    register: RegisterPage;
    books: BookPages;
    assert: Assert;

}>({
    login: async ({ page }, use) => {
        await use(new LoginPage(page))
    },

    header: async ({ page }, use) => {
        await use(new HeaderPage(page))
    },

    register: async ({ page }, use) => {
        await use(new RegisterPage(page))
    },

    books: async ({ page }, use) => {
        await use(new BookPages(page))
    },

    assert: async ({ page }, use) => {
        await use(new Assert(page))
    },
})

export default test;
export const expect = test.expect;