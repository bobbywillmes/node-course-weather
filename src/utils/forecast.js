const request = require('request')
const forecast = (lat, long, callback) => {
  console.log(`forecast()`)
  const url = `http://api.weatherstack.com/current?access_key=0bce560a9433a11ce264d6556e160708&units=f&query=${lat},${long}`

request({ url, json: true }, (error, { body }) => {
  if(error) {
    callback('Unable to connect to weather api', undefined)
    return
  } else if(body.error) {
    callback('Unable to find location, try another search', undefined)
    return
  } else {
    callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' and feels like ' + body.current.feelslike + '.')
  }
})
}

module.exports = forecast