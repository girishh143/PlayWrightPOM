import { expect, Page } from "@playwright/test";
import BaseFunctions from "../app.book.base/baseFunctions";
import HeaderPage from "./headerPage";

export default class BookPage {

    private base: BaseFunctions
    private header: HeaderPage

    constructor(private page: Page) {
        this.base = new BaseFunctions(page);
        this.header = new HeaderPage(page);
    }

    private Elements = {
        categories: "app-book-filter a",
        title: "div.card-title",
        price: "div.card-title +p",
        aaAddToCartBt: "//button[@color='primary']",
        bookCard: "mat-card",
        snackBar: "//span[text()='One Item added to cart']",
    }

    async verifyAllCategories(categories: string[]) {
        const bookCategories = this.page.locator(this.Elements.categories)
        await expect(bookCategories).toHaveText(categories)
    }

    async addBookToCart(book: string) {
        await this.header.enterBookName(book);
        await expect(this.page.locator(this.Elements.title)).toHaveText(book, { ignoreCase: true })
        await this.page.click(this.Elements.aaAddToCartBt)
        const toast = this.page.locator(this.Elements.snackBar)
        await expect(toast).toBeVisible();
        await expect(toast).toHaveText("One Item added to cart", { ignoreCase: true })
    }
}