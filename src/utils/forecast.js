const request = require('postman-request');
//destractur body
const forecast = (longitude, lattiude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=33720d4eef676aae7fabe57daa8562eb&query=${lattiude},${longitude}`;
    request({url, json: true}, (err, {body}) => {
        if (err) {
            callback('Cannot connect to weather service.', undefined);
        }
        else if (body.error) {
            callback('Unable to find location.', undefined);
        }
        else {
            callback(undefined, {
                temperature: body.current.temperature,
                feelslike: body.current.feelslike
            });
        }
    });
};

module.exports = forecast;