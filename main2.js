const playwright = require("playwright");
 
async function getData() {
  const browser = await playwright.chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
 
  // Set custom headers
  await page.setExtraHTTPHeaders({
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
    'Accept-Language': 'en-US,en;q=0.9'
  });
 
  await page.goto("https://books.toscrape.com/");
  const data = await page.evaluate(() => {
    const results = [];
    // Select elements on the page and extract data
    const elements = document.querySelectorAll(".product_pod");
    for (const element of elements) {
      results.push({
        url: element.querySelector("a").href,
        Name: element.querySelector("h3").innerText,
      });
    }
    return results;
  });
  console.log(data);
  await browser.close();
}
 
getData();