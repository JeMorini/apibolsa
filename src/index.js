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

  const api = [];
  for (let i = 0; i < data.length - 4; i++) {
    const obj = {};
    obj.ticker = data[i];
    obj.name = data[i + 1];
    obj.price = data[i + 2];
    obj.variation = data[i + 3];
    api.push(obj);
  }

  console.log(api);
})();
