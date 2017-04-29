const axios = require('axios')
const fs = require('fs')
const cheerio = require('cheerio')

const ameClass = '.speaker.amefile',
  breClass = '.speaker.brefile'


function normalizeWord(word) {
  return word.trim().replace(/\s+/g, '-').toLowerCase()
}

function getURL(word) {
  return `http://www.ldoceonline.com/dictionary/${word}`
}

function getPronounciation(word) {

  return axios.get(getURL(word))
    .then(res => {
      const $ = cheerio.load(res.data)
      const ameFile = $(ameClass).data('src-mp3'),
      breFile = $(breClass).data('src-mp3')

      return {
        american: ameFile,
        british: breFile
      }
    })
    .catch(console.warn)

}

module.exports = {
  getPronounciation
}
