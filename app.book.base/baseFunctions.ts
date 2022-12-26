import { Page } from "@playwright/test";

export default class BaseFunctions {

    constructor(private page: Page) {

    }

    async goto(url: string) {
        await this.page.goto(url, {
            waitUntil: "domcontentloaded"
        })
    }

    async waitAndClick(locator: string) {
        const element = this.page.locator(locator)
        await element.waitFor({
            state: "visible"
        })
        await element.click()
    }

    async navigateTo(link: string) {
        const element = this.page.locator(link)
        await Promise.all([
            this.page.waitForNavigation(),
            this.page.click(link)
        ])
    }
}