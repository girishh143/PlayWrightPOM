import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './tests',
  testMatch: [
    //"tests/registerUser.test.ts",
    //"tests/loginUser.test.ts",
    // "addProductToCart.test.ts",
    "env_loginUser.test.ts",
    // "tests/pdfFileVerification.test.ts"

  ],
  timeout: 1 * 30 * 1000,


  expect: {
    /*Maximun time expect() should wait fir the condition to be met */
    timeout: 3000
  },

  /*Fail the build in the CI if you accidently left test.only in the source code. */
  forbidOnly: !!process.env.CI,

  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 2,
  reporter: [
    ["dot"],
    ["html", {
      open: "on-failure"
    }],
    ["json", {
      outputFile: "test-result.json"
    }],
    ["allure-playwright"]
  ],

  //This will execute the test which are having given tag.
  //grep: [new RegExp("@TagloginTest")],

  // this will execute the except given tag test.
  //grepInvert: [new RegExp("@TagloginTest")],

  use: {
    launchOptions: {
      // slowMo: 2000,
    },

    headless: false,
    //viewport: { width: 1280, height: 720 },
    baseURL: "https://bookcart.azurewebsites.net/",
    //actionTimeout: 2 * 30 * 1000,
    trace: 'retain-on-failure',
    video: "retain-on-failure",
    screenshot: {
      mode: 'only-on-failure',
      fullPage: true,
    }
  },


  //globalSetup: "globalSetup.ts",

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },

    // {
    //   name: 'firefox',
    //   use: {
    //     ...devices['Desktop Firefox'],
    //   },
    // },

  ],
};

export default config;
