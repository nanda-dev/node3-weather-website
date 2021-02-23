const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
        //'Los%20Angeles' +
        encodeURIComponent(address) +
        '.json?access_token=pk.eyJ1IjoibmFuZGFnb3BhbjIwMDEiLCJhIjoiY2trenA2djdtMGc1dDJwbWxsYzFkeDZxMSJ9.pKLbR-5QDrGmn3IXBu5sSg&limit=1'

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location/mapbox-geocoding service!', undefined)
        } else if (!body.features || body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode