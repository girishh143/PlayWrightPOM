import { expect, Page } from "@playwright/test";
import BaseFunctions from "../app.book.base/baseFunctions";
type gender = {
    m: "male",
    f: "female"
}



export default class RegisterPage {

    private base: BaseFunctions
    constructor(private page: Page) {
        this.base = new BaseFunctions(page)
    }

    private Elements = {
        fName: "#mat-input-0",
        lName: "//input[@id='mat-input-1']",
        userName: "//input[@data-placeholder='User Name']",
        password: "//input[@data-placeholder='Password']",
        confirmPassword: "//input[@id='mat-input-4']",
        maleInput: "input[id='mat-radio-2-input']",
        femaleInput: "//input[contains(text(),'Female')]",
        maleRadioBtn: "//span[contains(text(),'Male')]",
        femaleRadipBtn: "//span[contains(text(),'Female')]",
        regBtn: "//button[@color='primary']/span[text()='Register']"

    }

    async navigateToRegisterPage() {
        await this.base.goto("register")
    }

    async registerUser(firstname: string, lastname: string,
        userName: string, password: string,
        confirmPassword: string, gender: string) {
        await this.page.click(this.Elements.fName)
        await this.page.fill(this.Elements.fName, firstname)
        await this.page.fill(this.Elements.lName, lastname)
        await this.page.fill(this.Elements.userName, userName)
        await this.page.fill(this.Elements.password, password)
        await this.page.fill(this.Elements.confirmPassword, confirmPassword)
        if (gender == "m") {
            await this.page.click(this.Elements.maleRadioBtn)
            await expect(this.page.locator(this.Elements.maleInput)).toBeChecked()
        } else {
            await this.page.click(this.Elements.femaleInput)
            await expect(this.page.locator(this.Elements.femaleInput)).toBeChecked()
        }
        //await this.page.pause();
        //Click on registration button
        //await this.base.navigateTo(this.Elements.regBtn);
        const regBtn = this.page.locator(this.Elements.regBtn)
        await regBtn.click({ delay: 1000 })
    }

}