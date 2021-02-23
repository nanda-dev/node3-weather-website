const express = require('express')
const path = require('path')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Heroku sets the PORT number dynamically, 
// and makes the value accessible through the environment variable: 'PORT'.
// Below line will get the value from the PORT env var if it's set there, 
// else will use the default static port# 3000. This way, local build will also run without any problem.
const port = process.env.PORT || 3000 

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Set view engine to handlebars
// Requires the .hbs template files to be present under: 
// webserver-root > views directory.

app.set('view engine', 'hbs')

// To override the default views template dir, set the 'views' application setting.
app.set('views', viewsPath)

app.use(express.static(publicDirectoryPath))

hbs.registerPartials(partialsPath)

console.log(__dirname)
//console.log(__filename)

console.log(path.join(__dirname, '../public'))


// Once the public/static folder is setup, the below
// '' or '/' route will cease to work.
// User can go to <app:port>/index.html
// app.get('', (req, res) => {
//     res.send('<h1>Hello express!</h1>')
// })

// When dynamic templates are to be used, with handlebars, 
// return the view/template name (without the .hbs extension)
// and node.js will return the resulting html to the client.
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Nanda Gopan G S'
    })
})
// app.get('/help', (req, res) => {
//     //res.send('Help page')
//     res.send([{
//         name: 'Harry',
//         age: 17
//     }, {
//         name: 'Ron',
//         age: 17
//     }])
// })

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some Helpful text!',
        title: 'Help',
        name: 'Nanda Gopan G S'
    })
})

// app.get('/about', (req, res) => {
//     res.send('<h1>About</h2>')
// })

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Nanda Gopan G S'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error }) // equivalent to {error : error}
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                location, // same as: location: location
                forecast: forecastData,
                address: req.query.address
            })
        })
    })


})

app.get('/products', (req, res) => {
    console.log(req.query)
    if (!req.query.search) {
        return res.send({
            error: "Search value is required"
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Help article not found.',
        title: '404',
        name: 'Nanda Gopan G S'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'Page not found.',
        title: '404',
        name: 'Nanda Gopan G S'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})


