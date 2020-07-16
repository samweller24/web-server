const request = require('request')

const geoCode = (address, callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoic2FtbWFuIiwiYSI6ImNrYmh6MWh2MzA2amoyeXBkYnhybDZ3N2MifQ.7UG1ZLH3JAh7HGFfb0GwVg'
    
    request({url: url, json: true},(error, response) =>{
        if(error != null){
            callback(error)
        }else if (response.body.features.length === 0){
            callback(response.body.error)
        }else{
            callback(undefined, {
                latitude : response.body.features[0].center[1],
                longatude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}


module.exports = geoCode
