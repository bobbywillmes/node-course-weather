console.log(`Client side JS is loaded`)

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const location = search.value
  console.log(`form submitted`)

  messageOne.textContent = 'Getting weather...'
  messageTwo.textContent = ''
  fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      if(data.error) {
        console.log(`data.error ---`)
       return messageOne.textContent = data.error
      }
      console.log(data)
      messageOne.textContent = data.location
      messageTwo.textContent = data.forecast
    })
  })
  
})