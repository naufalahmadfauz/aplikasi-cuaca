const request = require('request')
const forecast = (long, lat, callback) => {
    const url = 'https://api.darksky.net/forecast/8dee8bc65eb4109ad87ef861e0e5d7fb/' + long + ',' + lat + '?lang=id&units=si'
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else if (body.error) {
            callback('Unable to find the location!')
        } else {
            const data = `Hari ini ${body.daily.data[0].summary} Suhu Sekarang ${body.currently.temperature} Derajat Celcius. Kemungkinan Hujan ${body.currently.precipProbability}% Suhu Terendah Hari Ini ${body.daily.data[0].temperatureMin} Derajat Celcius Dan Tertinggi ${body.daily.data[0].temperatureMax} Derajat Celcius `
            callback(undefined, data)
        }
    })
}

module.exports = forecast
