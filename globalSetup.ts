import * as dotenv from "dotenv"
dotenv.config()
import { FullConfig } from "@playwright/test";



async function globalSetup(config: FullConfig) {

    if (process.env.test_env) {
        console.log("File Name ===> ", process.env.test_env)
        dotenv.config({
            path: `.env.${process.env.test_env}`,
            override: true
        })
        console.log("File Name After ===> ", process.env.test_env)
    }
}

export default globalSetup;