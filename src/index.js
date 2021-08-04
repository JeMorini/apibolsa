const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://br.investing.com/equities/");
  const data = await page.$$eval("table tr td", (tds) =>
    tds.map((td) => {
      return td.innerText;
    })
  );
  console.log(data);

  await browser.close();
})();
