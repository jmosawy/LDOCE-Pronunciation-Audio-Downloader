const express = require('express')
const {getPronounciation} = require('./index')
const port = process.env.PORT || 8080

const app = express()

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', '*')
  // res.header('Access-Control-Allow-Headers', '*')

  next()
})

app.use(express.static(__dirname))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.get('/pronounce', (req, res) => {
  const {word} = req.query

  return getPronounciation(word.toLowerCase())
    .then(response => {
      return res.status(200).json(response)
    })
    .catch(e => {
      return res.status(400).json({
        error: true,
        message: 'Something went wrong'
      })
    })
})

app.listen(port, () => {
  console.log(`API Server running on ${hostname}:${port}`)
})
