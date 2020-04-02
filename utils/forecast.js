const request = require('request')

const forecast = (latitude, longitude , callback ) => {
    const url = 'https://api.darksky.net/forecast/d0e975d4178a42b8d912f46c120f1244/'+latitude+','+longitude+''
    request({ url, json : true}, (error,{ body }) =>{
        if (error){
            callback('Unable to connect to weather service!', undefined)
        } else if (body.code === 400) {
            callback('Unable to find Location...', undefined)
        } else {
            const requiredData = body.daily.data[0].summary + ' It is currently ' +body.currently.temperature + ' degrees out . There is a '+body.currently.precipProbability+ ' % chance of rain.'
            callback(undefined, requiredData)
        }
    })
}

module.exports = forecast