const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('../utils/geocode.js')
const forecast = require('../utils/forecast.js')

console.log(__dirname)
console.log(path.join(__dirname,'./public'))

const app = express()

//Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Set up handlebars engine and views location
app.set('view engine','hbs')
app.set('views',  viewPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
    res.render('index', {
        title : 'Weather',
        name : 'Dattatray Savant'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title : 'About Me',
        name : 'Dattatray Savant'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
       helpText : 'Do you need help?',
       title : 'Help',
       name : 'Dattatray Savant'
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.address){
        res.send({
            Error : 'Please provide address'
        })
    } else {

        geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
            if (error) {
                return res.send({error})
            }
            forecast(latitude, longitude , (error, forecastData) => {
                if (error) {
                    return res.send({error})
                }
                res.send({
                    forecast : forecastData,
                    location,
                    address : req.query.address
                })
            })
        })
    }
})

app.get('/products',(req,res) =>{
    if(req.query.pid){
        console.log(req.query);
        res.send({
            products : []
        })
    } else {
        res.send({
            Error : 'Please provide pid'
        })
    }
    
})

app.get('/help/*',(req,res) =>{
    res.render('404',{
        title : '404-Help',
        name : 'Dattatray Savant',
        errorMessage : 'Help Article Not Found'
    })
})

app.get('*', (req,res) =>{
    res.render('404',{
        title : '404',
        name : 'Dattatray Savant',
        errorMessage : 'Page Not Found'
    })

})

app.listen(3000, () => {
    console.log('Server is listening on port 3000...')
})