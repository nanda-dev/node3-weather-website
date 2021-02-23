const request = require('request')

const weatherStackToken = process.env.WEATHER_STACK_TOKEN || '3b6de9ecd1c278f74549b3b91b7e1afe'

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?' +
        'access_key=' + weatherStackToken +
        '&query=' + encodeURIComponent(latitude + ',' + longitude) +
        '&units=f'

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location.', undefined)
        } else {
            const data = body
            callback(undefined, data.current.weather_descriptions[0]
                + '. It is currently '
                + data.current.temperature + ' degrees out. It feels like '
                + data.current.feelslike + ' degrees out.'
                + ' The humidity is ' + data.current.humidity + '%.')
        }
    })
}

module.exports = forecast