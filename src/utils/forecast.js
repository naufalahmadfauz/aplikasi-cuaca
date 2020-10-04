const request = require('request')
const forecast = (long, lat, callback) => {
    const url = 'https://api.darksky.net/forecast/8dee8bc65eb4109ad87ef861e0e5d7fb/' + long + ',' + lat + '?lang=id&units=si'
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else if (body.error) {
            callback('Unable to find the location!')
        } else {
            const data = `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out. There is a ${body.currently.precipProbability}% Chance of rain `
            callback(undefined, data)
        }
    })
}

module.exports = forecast
