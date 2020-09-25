const puppeteer = require('puppeteer');

/* Scrolling the element */
async function scrollDown(selector, page) {
  await page.evaluate(async (selector) => {
    const section = document.querySelector(selector);
    await new Promise((resolve, reject) => {
      let totalHeight = 0;
      let distance = 100;
      const timer = setInterval(() => {
        var scrollHeight = section.scrollHeight;
        section.scrollTop = 100000000;
        totalHeight += distance;

        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 900);
    });
  }, selector);
}

/* Function handles Login  */

const login = async (page, userName, password) => {
  await page.waitForSelector('input[name=username]');
  await page.type('input[name=username]', userName, {
    delay: 20,
  });
  await page.type('input[name=password]', password, { delay: 20 });
  await page.click('button[type=submit]', { delay: 20 });
  await page.waitFor(5000);
  const notifyBtns = await page.$x("//button[contains(text(), 'Not Now')]");
  if (notifyBtns.length > 0) {
    await notifyBtns[0].click();
    console.log('-------NOTIFY BUTTON CLICKED--------');
    return;
  } else {
    console.log('------NOTIFY BUTTON NOT CLICKED-----');
  }
};
