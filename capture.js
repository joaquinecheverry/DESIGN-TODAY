const puppeteer = require('puppeteer-core');
const path = require('path');

(async () => {
    const browser = await puppeteer.launch({
        executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });

    const filePath = 'file://' + path.resolve(__dirname, 'index.html');
    await page.goto(filePath, { waitUntil: 'domcontentloaded', timeout: 120000 });

    // Wait longer for images to actually render
    await new Promise(r => setTimeout(r, 8000));

    const height = await page.evaluate(() => document.body.scrollHeight);

    await page.pdf({
        path: 'design-today.pdf',
        width: '1440px',
        height: `${height}px`,
        printBackground: true,
        pageRanges: '1',
    });

    console.log('Saved design-today.pdf');
    await browser.close();
})();   