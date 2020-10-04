const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()
const port = process.env.PORT||3000
//xd
//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//set up handlebars engine and view location
app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)
//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Naufal Ahmad Fauzan'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        name: 'Naufal Ahmad Fauzan',
        title: 'About Me'
    })
})

app.get('/help', ((req, res) => {
    res.render('help', {
        help: 'This is help',
        title: 'Help',

        name: 'Naufal Ahmad Fauzan'
    })
}))

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location}={}) => {
        if (error) {return res.send({error})}

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
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

app.get('/help/*', ((req, res) => {
    res.render('404', {
        errorMessage: 'Help article not found',
        name: 'Naufal Ahmad Fauzan',
        title: 'Help article not found'
    })

}))

app.get('*', ((req, res) => {
    res.render('404', {
        errorMessage: 'Page not found',
        title: 'Not Found',
        name: 'Naufal Ahmad Fauzan'

    })
}))


app.listen(port, () => {
    console.log('Server is running on port'+port)
})

//express melihat route dari atas ke bawah,mana yang ketemu duluan