import { Page } from "@playwright/test";
import Assert from "../app.book.base/asserts";
import BaseFunctions from "../app.book.base/baseFunctions";


export default class LoginPage {

    private base: BaseFunctions
    constructor(private page: Page) {
        this.base = new BaseFunctions(page)
    }

    private Elements = {

        userInput: "Username",
        passwordInput: "password",
        loginBtn: "(//span[text()='Login'])[2]",
        errorMessage: "alert"
    }

    async navigateToLoginPage() {
        await this.base.goto("/login");
    }

    async enterUserName(user: string) {
        await this.page.getByLabel(this.Elements.userInput).fill(user)
    }

    async enterPassword(password: string) {
        await this.page.getByLabel(this.Elements.passwordInput).fill(password)
        //    await this.page.fill(this.Elements.passwordInput, password)
    }

    async clickLoginButton() {
        //  this.base.navigateTo(this.Elements.loginBtn)
        await this.base.waitAndClick(this.Elements.loginBtn)
        await this.page.waitForLoadState();
        // window.onload = function () {
        //     console.log("page is fully loaded");
        // };

    }

    async getErrorMessage() {
        const msg = this.page.getByRole("alert")
        await msg.waitFor({
            state: "visible"
        })
        return (await msg.innerText()).valueOf()
    }


    async loginUser(user: string, password: string) {
        // await this.assert.assertURL("https://bookcart.azurewebsites.net/login")
        await this.enterUserName(user)
        await this.enterPassword(password)
        await this.clickLoginButton()
    }
}