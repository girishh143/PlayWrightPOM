import { expect, Page } from "@playwright/test";
import BaseFunctions from "../app.book.base/baseFunctions";

export default class HeaderPage {
    private base: BaseFunctions

    constructor(private page: Page) {
        this.base = new BaseFunctions(page)
    }

    private headerPageElement = {
        searchInput: "Search books or authors",
        cartBtn: "button.mat-focus-indicator.mat-icon-button",
        cartValue: "#mat-badge-content-0",
        loginLink: "//span[text()='Login']/..",
        userMenu: "//button[contains(@class,'mat-focus-indicator mat-menu-trigger')]//span[1]",
        myOrder: "//button[text()='My Orders' and @role='menuitem']",
        logoutLink: "//button[text()='Logout' and @role='menuitem']"
    }


    async enterBookName(bookname: string) {
        await this.page.getByPlaceholder(this.headerPageElement.searchInput).type(bookname)
        await this.base.waitAndClick("mat-option[role='option']")
    }

    async clickOnCart() {
        await this.page.click(this.headerPageElement.cartBtn)
    }

    async getCartValue() {
        await this.page.waitForTimeout(2000)
        return await this.page.textContent(this.headerPageElement.cartValue)
    }

    async clickLoginLink() {
        await this.base.navigateTo(this.headerPageElement.loginLink)
        // this.base.waitAndClick(this.headerPageElement.loginLink)
    }

    async ClickOnUserMenu() {
        await this.page.waitForSelector(this.headerPageElement.userMenu)
        await this.base.waitAndClick(this.headerPageElement.userMenu)
    }

    async ClickOnMyOrder() {
        await this.ClickOnUserMenu()
        await this.base.waitAndClick(this.headerPageElement.myOrder)
    }

    async logoutUser() {
        await this.ClickOnUserMenu()
        await this.page.waitForLoadState('domcontentloaded')
        // await this.page.waitForSelector(this.headerPageElement.logoutLink)
        const toast = this.page.locator(this.headerPageElement.logoutLink)
        await expect(toast).toBeVisible();
        await this.base.navigateTo(this.headerPageElement.logoutLink)
    }

    async verifyLoginSuccess() {
        await this.page.waitForLoadState('domcontentloaded')
        await expect(this.page.locator(this.headerPageElement.userMenu)).toBeVisible()
    }

}