const express = require('express')
const {getPronounciation} = require('./index')
const port = 4000
const hostname = 'localhost'

const app = express()

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', '*')
  // res.header('Access-Control-Allow-Headers', '*')

  next()
})

app.get('/pronounce', (req, res) => {
  const {word} = req.query

  return getPronounciation(word)
    .then(response => {
      return res.status(200).json(response)
    })
    .catch(e => {
      console.log(e)
      return res.status(400).json({
        error: true,
        message: 'Something went wrong'
      })
    })
})

app.listen(port, hostname, () => {
  console.log(`API Server running on ${hostname}:${port}`)
})
