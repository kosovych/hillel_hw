function initAutocomplete() {
  const input = document.querySelector('#google-places');
  const autocomplete = new google.maps.places.Autocomplete(
     input,
     { types: ['geocode'] }
  );
  
  autocomplete.addListener('place_changed', () => {
    const selectedPlace = autocomplete.getPlace();
    let lat = selectedPlace.geometry.location.lat();
    let lng = selectedPlace.geometry.location.lng();

    console.log(selectedPlace);
    getWeather(lat, lng)
  });
}

// Add google places script
const script = document.createElement('script');
script.src = 'https://maps.googleapis.com/maps/api/js?libraries=places&callback=initAutocomplete';

document.body.appendChild(script);

let weathrKEY = '380c88df3fbf4c5db27e7cce0379ead1';
let proxi = 'https://cors-anywhere.herokuapp.com/';

function getWeather(lat, lng) {
    fetch(`https://api.weatherbit.io/v2.0/current?&lat=${lng}&lon=${lng}&key=${weathrKEY}`, {method: 'GET'})
    .then(res => res.json())
      .then(data => parseData(data))
      .then(weatherObj => console.log(weatherObj));
}

function parseData(_data) {

  let data = _data.data[0];

  return {
    city: data.city_name,
    temp: data.app_temp,
    img: data.weather.icon,
    descroption: data.weather.description
  }
}