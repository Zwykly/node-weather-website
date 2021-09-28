const express =  require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handle bars, engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Igor Szuba'
    });
});

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About',
        name: 'Igor Szuba'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'We are here to help you ;-)',
        title: 'Help',
        name: 'Igor Szuba'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Address wasnt provided'
        });
    };
    geocode(req.query.address, (err, {latitude, longitude, placeName} = {}) => {
        if (err) {
            return res.send({
                error: err
            });
        }
        forecast(latitude, longitude, (err, {feelslike, temperature}) => {
            if (err) {
                return res.send({
                    error: err
                });
            }
            return res.send({
                address: req.query.address,
                placeName,
                temperature,
                feelslike
            });
        });
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Igor Szuba',
        error: 'Help article not found.'
    })
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Igor Szuba',
        error: 'Page  not found.'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});