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
  }
};

/* Function extaacts userNames  */
const getAllUserNames = async (userName, password, baseURL) => {
  /* Initial pagesetup */
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  const navigationPromise = page.waitForNavigation();
  await page.goto(baseURL, {
    waitUntil: 'networkidle2',
  });

  await page.waitFor(5000);
  let form = await page.$$('#loginForm');

  if (form.length > 0) {
    await login(page, userName, password);
  }

  const bannerSelector =
    '#react-root > section > main > div > div > article > header > div.o-MQd.z8cbW > div.PQo_0.RqtMr > div.e1e1d > a';

  await page.waitForSelector(bannerSelector);
  await page.evaluate((_) => {
    window.scroll(0, 200);
  });

  const numberOfLikesSelector =
    'article[role="presentation"] > div:last-child > section:nth-child(2) div > div:last-child button span';

  const totalLikes = await page.$eval(
    numberOfLikesSelector,
    (e) => e.textContent
  );

  console.log('Total Likes', totalLikes);

  const likesButton =
    '#react-root > section > main > div > div > article > div.eo2As > section.EDfFK.ygqzn > div > div > button > span';

  await page.click(likesButton);

  form = await page.$$('#loginForm');

  if (form.length > 0) {
    await login(page, userName, password);
  }

  try {
    await page.goto(baseURL, { waitUntil: 'networkidle2' });
    await page.evaluate((_) => {
      window.scroll(0, 200);
    });
    await page.click(likesButton);
    await page.waitForSelector('div[role="dialog"] > div > div > div > h1');

    await page.waitFor(3000);

    const scrollBox =
      'div[role="presentation"]  div[role="dialog"] div div:nth-child(2) > div';

    await scrollDown(scrollBox, page);

    await page.waitFor(3000);

    const likesSelector =
      'div[role="dialog"] > div > div:nth-child(2) > div > div > div > div:nth-child(2) > div > div > span a';

    const arr = await page.$$eval(likesSelector, (users) => {
      return users.map((user) => {
        return user.textContent;
      });
    });

    console.log('[----------] [-----------------]', arr, totalLikes);

    return {
      isPrivate: false,
      totalLikes: totalLikes,
      userNames: arr,
    };
  } catch (err) {
    console.log('PROMISE ERROR', err.message);
  }
  await navigationPromise;
};

module.exports = getAllUserNames;
