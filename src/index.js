const express = require("express");
const router = express.Router();

const puppeteer = require("puppeteer");

let api = [];

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://br.investing.com/equities/");
  const data = await page.$$eval("table tr td", (tds) =>
    tds.map((td) => {
      return td.innerText;
    })
  );
  console.log("regis", data);

  await browser.close();

  for (
    let i = 1;
    i < data.length;
    i = !!data[i + 4] ? i + 4 : (i = data.length)
  ) {
    const obj = {};
    obj.ticker = data[i];
    obj.name = data[i + 1];
    obj.price = data[i + 2];
    obj.variation = data[i + 3];
    api.push(obj);
  }

  console.log("api braba", api);

  router.get("/", function (req, res, next) {
    res.status(200).send({
      api,
    });
  });
})();

module.exports = router;
