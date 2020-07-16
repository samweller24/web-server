const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geoCode = require('./utils/geocode')


const app = express()

//paths
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//hbs engine and views
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//static setup
app.use(express.static(publicDirectory))


app.get('', (req,res) =>{
    res.render('index', {
        title: 'Weather App',
        name: 'Sam Weller'
    })

})

app.get('/about', (req, res)=>{
    res.render('about',{
        title: 'About Me',
        name: 'Sam'
    })
})

app.get('/help', (req, res)=>{
    res.render('help',{
        message: 'This is a message',
        title: "Help"
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address.'
        })
    }
    geoCode(req.query.address,(error, data = {}) => {
        if(error) return res.send(error)
        forecast(data, (error,forecastData)=>{
               if(error) return res.send(error)
               res.send({
                   forecast: forecastData,
                   loction: data.location,
                   address: req.query.address
               })
        })
     })

})

app.get('/products', (req,res) => {
    if(!req.query.search){
        return res.send({
            error: 'you must provide a search term'
        })
    }

    res.send({
        products: []
    })
})

app.get('/help/*',(req,res)=>{
    res.render('error',{
        message: 'Error. Help Article not found',
        title: "404 ERROR"
    })
})

app.get('*',(req,res) =>{
    res.render('error',{
        message: 'Error. Page not Found',
        title: "404 ERROR"
    })
})

app.listen(3000, () =>{
    console.log('Server is running')
})