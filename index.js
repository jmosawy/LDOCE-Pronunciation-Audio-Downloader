const request = require('request');
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const downloadPath = path.resolve(__dirname, 'downloads/');
const ameClass = '.speaker.amefile',
  breClass = '.speaker.brefile'


function normalizer(word) {
  return word.trim().replace(/\s+/g, '-').toLowerCase();
}
function fileDownloader(link, fileName) {
  if (!fs.existsSync(downloadPath)) {
    fs.mkdir(downloadPath);
  }

  let req = request
    .get(link)
    .on('error', err => {
      return err;
    })
    .on('response', res => {
      if (res.statusCode == 200)
        req.pipe(fs.createWriteStream(path.resolve(downloadPath, `${fileName}.mp3`)));
    })
}

function main(link, word) {

  request(link, (error, response, body) => {
    if (error) return error;

    const $ = cheerio.load(body);
    const ameFile = $(ameClass).data('src-mp3'),
      breFile = $(breClass).data('src-mp3');


    // Downloading American Pronunciation
    fileDownloader(ameFile, `ame-${word}`);

    // Downloading British Pronunciation
    fileDownloader(breFile, `bre-${word}`);

  })
}

let word = normalizer(process.argv[2]);
main(`http://www.ldoceonline.com/dictionary/${word}`, word);
