const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const locationEl = document.querySelector('#location')
const weatherEl = document.querySelector('#weather')

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const location = search.value
  console.log(`form submitted`)

  locationEl.textContent = 'Getting weather...'
  fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      if(data.error) {
        console.log(`error getting weather ---`)
        locationEl.textContent = data.error
        weatherEl.innerHTML = ''
       return
      }
      console.log(data)
      locationEl.textContent = `${data.location} at ${data.forecast.location.localtime}`

      let html = `
      <h3>${data.forecast.current.weather_descriptions[0]}</h3>
      <img src="${data.forecast.current.weather_icons[0]}" alt=""/>
      <table class="table">
        <tbody>
          <tr>
            <td>Temperature (&deg;f)</td>
            <td>${data.forecast.current.temperature}</td>
          </tr>
          <tr>
            <td>Humidity</td>
            <td>${data.forecast.current.humidity}&percnt;</td>
          </tr>
          <tr>
            <td>Cloud Cover</td>
            <td>${data.forecast.current.cloudcover}&percnt;</td>
          </tr>
          <tr>
            <td>Wind Speed</td>
            <td>${data.forecast.current.wind_speed} mph ${data.forecast.current.wind_dir}</td>
          </tr>
        </tbody>
      </table>
      `
      weatherEl.innerHTML = html

    })
  })
  
})