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
    getWeather(lat, lng, $weatherContainer)
  });
}

// Add google places script
const script = document.createElement('script');
script.src = 'https://maps.googleapis.com/maps/api/js?libraries=places&callback=initAutocomplete';

document.body.appendChild(script);

let weathrKEY = '380c88df3fbf4c5db27e7cce0379ead1';
let proxi = 'https://cors-anywhere.herokuapp.com/';
let $weatherContainer = document.getElementById('weather-app-id');

function getWeather(lat, lng, weatherContainer) {
  weatherContainer.classList.add('onload');
    fetch(`https://api.weatherbit.io/v2.0/current?&lat=${lat}&lon=${lng}&key=${weathrKEY}`, {method: 'GET'})
    .then(res => res.json())
      .then(data => parseData(data))
      .then(weatherObj => renderWeather($weatherContainer, weatherObj));
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


function renderWeather(container, weatherObj) {
  container.innerHTML = `
    <h3 class="weather-app__city">${weatherObj.city}</h3>
    <div class="weather-app__icon">
      <img src="https://www.weatherbit.io/static/img/icons/${weatherObj.img}.png" alt="${weatherObj.descroption}">
    </div>
    <p class="weather-app__desc">${weatherObj.descroption}</p>
    <h4 class="weather-app__temp">${weatherObj.temp} &deg;C</h4>
  `;
  container.classList.remove('onload');
  return this
}