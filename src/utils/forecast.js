const request = require('request')

const forcast = ({latitude:lat, longitude: long, location}, callback) => {
     const url = 'http://api.weatherstack.com/current?access_key=d4a02743f39ec2b5a5fd9c58466e023e&query=' + lat +',' + long + '&units=m'
    request({url: url, json: true},(error, response) =>{
            if(error != null){
                callback(error)
            }else if ( response.body.error ){
               callback(response.body.error)
            }else {
                callback(undefined, 'In ' +location+ ' it is currently ' + response.body.current.temperature + ' with a ' + response.body.current.precip + '% chance of rain' 
                )
            }
        })
}

module.exports = forcast