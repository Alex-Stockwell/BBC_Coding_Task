//EXTERNAL
const fs = require('fs');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const geocoder = mbxGeocoding({ accessToken: 'pk.eyJ1IjoiYWxleHN0b2Nrd2VsbCIsImEiOiJjbDJwd3JuYW0xdXBpM2VucXRsazg5bmFpIn0.V4OawEZIt6pfQoXgk5gQJw' });

// LOCAL
const citiesJson = require('./english/cities.json');

const generateGeoData = async () => {
    const cities = []
    
    for (let x = 1; x <= 32; x++) {
        const name = citiesJson[`compare-tabs_1_city_${x}_name`];
        const aqi = parseInt(citiesJson[`compare-tabs_1_city_${x}_aqi`]);
        const cigg = citiesJson[`compare-tabs_1_city_${x}_cigg`];
        
        const geoData = await geocoder.forwardGeocode({
            query: name,
            limit: 1
        }).send();

        if (geoData.body.features.length > 0) {
            cities.push({
                name: name,
                aqi: aqi,
                cig: cigg,
                geometry: geoData.body.features[0].geometry,
                properties: {
                    popupMarkup: `<strong>${name}</strong> <p>AQI: ${aqi}</p>`,
                    aqi: aqi,
                    cig: cigg
                }
            })
        }
    }

    newJson = JSON.stringify(cities);
    fs.writeFile('./resources/data/english/cities.json', newJson, err => {
        if (err) {
            console.error(err);
        }
    });
}

generateGeoData().then(() => {
    console.log('Updated city data generated');
});