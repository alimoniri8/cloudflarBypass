const playwright = require("playwright");

async function getData() {
  const browser = await playwright.chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.setExtraHTTPHeaders({
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
    'Accept-Language': 'en-US,en;q=0.9'
  });
  await page.goto("https://www.ny.gov/agencies");

  // Add a random delay of 1 to 5 seconds to simulate human behavior
  await new Promise(resolve => setTimeout(resolve, Math.floor(Math.random() * 4000 + 1000)));

  // Scroll the page to load additional content
  await page.evaluate(() => window.scrollBy(0, window.innerHeight));

  // Add another random delay of 1 to 5 seconds
  await new Promise(resolve => setTimeout(resolve, Math.floor(Math.random() * 10000 + 1000)));

  const data = await page.evaluate(() => {
    const results = [];
    // Select elements on the page and extract data
    // const elements = document.querySelectorAll(".product_pod");
    const elements = document.querySelectorAll("span");
    for (const element of elements) {
      results.push({
        // url: element.querySelector("a").href,
        Name: element.innerText
      });
    }
    return results;
  });
  console.log(data);
  await browser.close();
}

getData();