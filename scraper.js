const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const fs = require("fs");

module.exports = {
  async sleep(miliseconds) {
    return new Promise((resolve) => setTimeout(resolve, miliseconds));
  },
  async getlisting(page) {
    try {
      const html = await page.content();
      const $ = cheerio.load(html);
      const itemListElement = $(".cy5jw6o.dir.dir-ltr")
        .map((idx, ele) => {
          const mainEle = $(ele);
          const urlEle = $(mainEle).children("a").attr("href").slice(0, 15);
          const url = `https://www.airbnb.ie${urlEle}`;
          return { url };
        })
        .get();
      return itemListElement;
    } catch (error) {
      console.log(error);
    }
  },

  async pageBuilder(url) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url);
    return page;
  },

  async getContent(urlList) {
    for (let i = 0; i < 4; i++) {
      let urlTarget = urlList[i].url;
      const page = await this.pageBuilder(urlTarget);
      const html = await page.content();
      const $ = cheerio.load(html);
      fs.writeFileSync(`./file${[i]}.html`, $.html());
      console.log(urlTarget);
      await this.sleep(1000); // Wait 3s to scrape the next page
    }
  },

  async init(urlInit) {
    try {
      const page = await this.pageBuilder(urlInit);
      const urlList = await this.getlisting(page);
      const updatedlist = await this.getContent(urlList);
      // console.log(updatedlist);
    } catch (error) {
      console.log(error);
    }
  },
};
