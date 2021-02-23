console.log('Client side javascript file is loaded!')

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })



const searchForm = document.querySelector('form')
const searchInput = document.querySelector('input')

const searchText = searchInput.value

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

//messageOne.textContent = 'RESULT WILL SHOW HERE'

searchForm.addEventListener('submit', (e) => {
    // by default, the page will be refreshed on form submit.
    // in our case, that is not needed. disable it by calling event.preventDefault()
    e.preventDefault()
    // accessing searchText here doesn't seem to work!
    const search = searchInput.value
    console.log('Get weather for location:', search)

    const weatherUrl = 'http://localhost:3000/weather?address=' + search

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch(weatherUrl).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                //console.log('Error:', data.error)
                messageOne.textContent =  data.error
            } else {
                //console.log(data.location, data.forecast)
                messageOne.textContent =  data.location
                messageTwo.textContent =  data.forecast
            }
        })
    })
})