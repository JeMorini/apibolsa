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

  await browser.close();

  const api = [];
  for (let i = 1; i < data.length - 4; i++) {
    const obj = {};
    obj.name = data[i];
    obj.last = data[i + 1];
    obj.max = data[i + 2];
    obj.min = data[i + 3];
    obj.varPrice = data[i + 4];
    obj.varPercentage = data[i + 5];
    api.push(obj);
  }

  console.log(api);
})();
