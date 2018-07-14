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
    return index === 0;
    return getLanguageCode(file) !== false;
  }).forEach((file) => {
    result[getLanguageCode(file)] = {};
    const $ = cheerio.load(fs.readFileSync(path.join(directory, file)));
    $('.CollapsiblePanel').each((index, panel) => {
      const panelElement = $(panel)
      const head = panelElement.find('h2').first();
      const headline = head.text().substr(0, head.text().indexOf(' '));

      result[getLanguageCode(file)][headline] = {};

      panelElement.find('tr').each((index, tr) => {
        const trElement = $(tr);
        console.log(trElement.find('a').first().html());
        const subHeadline = trElement.find('a').first().text();
        result[getLanguageCode(file)][headline][subHeadline] = 'foo';
      });
    });
    // result[getLanguageCode(file)] = 
  });

  return result;
};
