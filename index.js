const express = require('express')
const { getPronounciation } = require('./word')
const port = process.env.PORT || 5000

const envTask = (dev = () => { }, prod = () => { }) => {
  const env = process.env.NODE_ENV
  return (env === 'development' ? dev() : prod())
}

const app = express()

app.set('port', port)

app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*')
//   res.header('Access-Control-Allow-Methods', '*')

//   next()
// })

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
  res.render('pages/index', {
    apiServer: envTask(
      () => 'http://localhost:' + app.get('port') + '/pronounce',
      () => 'https://longman-api.herokuapp.com:' + app.get('port') + '/pronounce'
    )
  })
})

app.get('/pronounce', (req, res) => {
  const { word } = req.query

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

app.listen(app.get('port'), () => {
  console.log(`API Server running on port ${app.get('port')}`)
})
