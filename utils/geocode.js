const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoiZGF0c2F2MTk5NiIsImEiOiJjazhjenY2emcwNjN3M2hwZ241cHJ0N3hyIn0.eXiuEAx9rje0izGstHL93w&limit=1'

    request({ url, json : true}, (error,{body}) =>{
        if (error) {
            callback('Unable to connect to location services...', undefined)
        } else if (body.features.length === 0){
            callback('Unable to find location. Try another search...',undefined)
        } else {
            const requiredData = {
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                location : body.features[0].place_name
           }
            //console.log(myData)
            callback(undefined, requiredData)
        }
       
    })
}

module.exports = geocode