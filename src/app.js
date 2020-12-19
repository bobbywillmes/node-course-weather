const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine & views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// set static directory
app.use(express.static(publicDir))

app.get('', (req, res) => {
  res.render('index', { title: 'Weather', name: 'Bobby Willmes' })
})
app.get('/about', (req, res) => {
  res.render('about', { title: 'About Me', name: 'Bobby Willmes' })
})
app.get('/help', (req, res) => {
  res.render('help', { title: 'Help', name: 'Bobby Willmes', message: 'Your are here because you may need help.' })
})

app.get('/weather', (req, res) => {
  if(!req.query.address) {
    return res.send({
      error: 'You must provide an address.'
    })
  }
  console.log(req.query)

  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if(error) {
      return res.send({ error })
    }
  
    console.log(location)
    forecast(latitude, longitude, (error, forecastData) => {
      if(error) {
        return res.send({ error })
      }
  
      console.log(location)
      console.log(forecastData)
      res.send({ 
        location: location,
        forecast: forecastData, 
        address: req.query.address
      })
    })
  })



})

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    })
  }

  console.log(req.query)
  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', { title: '404', name: 'Bobby Willmes', message: 'Help article not found.' })
})

app.get('*', (req, res) => {
  res.render('404', { title: '404', name: 'Bobby Willmes', message: '404 error: page not found.' })
})

app.listen(port, () => {
  console.log(`Server up and running on port ${port}...`)
})