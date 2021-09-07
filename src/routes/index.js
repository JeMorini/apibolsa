const express = require("express");
const router = express.Router();

const puppeteer = require("puppeteer");

let api = [];

async function getData() {
  try {
    const browser = await puppeteer.launch({
      headless: false,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.goto("https://br.investing.com/equities/");
    const data = await page.$$eval("table tr td", (tds) =>
      tds.map((td) => {
        return td.innerText;
      })
    );

    await browser.close();

    for (
      let i = 1;
      i < data.length;
      i = !!data[i + 10] ? i + 10 : (i = data.length)
    ) {
      const obj = {};
      obj.name = data[i];
      obj.last = data[i + 1];
      obj.max = data[i + 2];
      obj.min = data[i + 3];
      obj.variationPrice = data[i + 4];
      obj.variationPercentage = data[i + 5];
      obj.vol = data[i + 6];
      obj.time = data[i + 7];
      i + 2;
      api.push(obj);
    }

    router.get("/", function (req, res, next) {
      res.status(200).send({
        api,
      });
    });
    setTimeout(getData(), 1000);
  } catch (err) {
    console.log(err);
  }
}

getData();

module.exports = router;
