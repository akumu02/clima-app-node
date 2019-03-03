const axios = require('axios');


const getLugarLatLng = async(direccion) => {

    let encodedUrl = encodeURI(direccion);

    let resp = await axios.get(`https://geocoder.api.here.com/6.2/geocode.json?app_id=IaUfKSWAsB1xTkwAbSt1&app_code=e2AII4g3pmjaTc1oiKio-w&searchtext=${ encodedUrl }`)

    if (resp.data.Response.View[0] === undefined) {
        throw new Error(`No hay resultados para la ciudad ${ direccion }`);
    }

    let location = resp.data.Response.View[0];

    return {
        direccion: location.Result[0].Location.Address.Label,
        lat: location.Result[0].Location.DisplayPosition.Latitude,
        lng: location.Result[0].Location.DisplayPosition.Longitude
    }
}

module.exports = {
    getLugarLatLng
}