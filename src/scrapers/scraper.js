import puppeteer from "puppeteer";

export default class Scraper {
  #page;
  #browser;
  #url;
  #selector;

  constructor() {
    this.#page = undefined;
    this.#browser = undefined;
    this.#url = undefined;
    this.#selector = undefined;
  }

  async scrape(url, selector, options = {}) {
    await this.#open(url, selector);

    const result = await this.extract(options);

    await this.#close();

    return result;
  }

  // Polymorphic method
  async extract(options) {
    throw new Error("extract() must be implemented");
  }

  async #open(url, selector) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    this.#page = page;
    this.#browser = browser;
    this.#url = url;
    this.#selector = selector;

    await page.goto(url, { waitUntil: "networkidle0" });

    await page.waitForSelector(selector);
  }

  async evaluate(callback, ...args) {
    const data = await this.#page.evaluate(callback, ...args);

    return data;
  }

  async #close() {
    await this.#browser.close();
  }

  getPage() {
    return this.#page;
  }

  getBrowser() {
    return this.#browser;
  }

  getUrl() {
    return this.#url;
  }

  getSelector() {
    return this.#selector;
  }
}
