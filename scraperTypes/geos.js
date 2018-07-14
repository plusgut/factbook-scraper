const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

function getLanguageCode(file) {
  const filename =  path.parse(file).name;
  if (filename.length > 2) {
    return false;
  }
  return filename
}

function getHeadlines() {

}

module.exports = function(directory) {
  const result = {};

  const files = fs.readdirSync(directory).filter((file, index) => {
    // return index === 0;
    return getLanguageCode(file) !== false;
  }).forEach((file) => {
    result[getLanguageCode(file)] = {};
    const $ = cheerio.load(fs.readFileSync(path.join(directory, file)));
    $('.CollapsiblePanel').each((index, panel) => {
      const panelElement = $(panel)
      const head = panelElement.find('h2').first();
      const headline = head.text().substr(0, head.text().indexOf(' '));

      result[getLanguageCode(file)][headline] = {};

      panelElement.find('tr[class]').each((index, tr) => {
        const headTrElement = $(tr);
        const contentTrElement = headTrElement.next().find('.category_data');
        const subHeadline = headTrElement.find('a').first().text().substr(1);
        result[getLanguageCode(file)][headline][subHeadline] = contentTrElement.text();
      });
    });
  });

  return result;
};
