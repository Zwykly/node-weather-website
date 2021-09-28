const request = require('postman-request');
//shorthand
const geocode = (addres, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(addres)}.json?access_token=pk.eyJ1IjoiemVudGF5dCIsImEiOiJja3R3c2s1OGsxNnFzMzNxbnV2bDFkNmJkIn0.CdtDLksF3XxAUIp0OnpgEg&limit=1`;
    request( {url, json: true}, (err, {body}) => {
        if (err) {
            callback('Couldnt connect to location service', undefined);
        }
        else if (body.message || body.features.length === 0) {
            callback('Couldnt find the address.', undefined);
        }
        else {
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                placeName: body.features[0].place_name
            });
        }
    });
}
module.exports = geocode;