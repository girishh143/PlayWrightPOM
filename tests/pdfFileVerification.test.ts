import { test, expect } from '@playwright/test';
import { readFileSync, writeFileSync } from 'fs';

test.describe("Verify the downloaded pdf", () => {
  // Define a test using Playwright's `test` function
  test('verify content', async ({ page }) => {

    // Navigate to a URL that serves a PDF file
    await page.goto('https://www.africau.edu/images/default/sample.pdf');

    // Wait for the download event and click on a link to download the PDF file
    const [download] = await Promise.all([
      page.waitForEvent('download'),
      page.waitForTimeout(10000)
      //  page.getByRole('link', { name: 'A Simple PDF File https://www.africau.edu › images › default › sample' }).click()
    ]);

    // Use the suggested filename from the download event to save the file
    const suggestedFileName = download.suggestedFilename();
    const filePath = 'ExportData/' + suggestedFileName;
    await download.saveAs(filePath);

    // Use the 'pdf-parse' module to extract the text from the PDF file
    var pdf = require('pdf-parse');
    var dataBuffer = readFileSync('./ExportData/sample.pdf');
    await pdf(dataBuffer).then(function (data) {
      writeFileSync('./ExportData/actual.txt', data.text);
    });

    // Read the expected and actual values from the saved files
    let expected_export_values = readFileSync('./ExportData/expected.txt', 'utf-8');
    let actual_export_values = readFileSync('./ExportData/actual.txt', 'utf-8');

    // Use the `expect` function from Playwright to assert that the values match
    expect(expected_export_values).toMatch(actual_export_values);
  })

});