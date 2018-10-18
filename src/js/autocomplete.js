const input = document.querySelector('#google-places');
let cacheArr = [];

let $weatherContainer = document.getElementById('weather-app-id');
let weathrKEY = '380c88df3fbf4c5db27e7cce0379ead1';

function isLocalStorageHasKey(item) {
    if(localStorage.getItem(item)) return true
    else return false
}

function initAutocomplete() {
  const autocomplete = new google.maps.places.Autocomplete(
     input,
     { types: ['geocode'] }
  );

  let lat;
  let lng;
  let city;

  autocomplete.addListener('place_changed', autocompleteHandler);

  if (isLocalStorageHasKey('cityForWeather')) {
    input.value = localStorage.getItem('cityForWeather');
    city = localStorage.getItem('cityForWeather');
    input.nextElementSibling.classList.add('has-value');
    lat = localStorage.getItem('latForWeather');
    lng = localStorage.getItem('lngForWeather');
    return getWeather(lat, lng, city, $weatherContainer);
  }
  
}

// Add google places script
const script = document.createElement('script');
script.src = 'https://maps.googleapis.com/maps/api/js?libraries=places&callback=initAutocomplete&language=en';

document.body.appendChild(script);


function getWeather(lat, lng, city, weatherContainer) {
  weatherContainer.classList.add('onload');
    fetch(`https://api.weatherbit.io/v2.0/current?&lat=${lat}&lon=${lng}&key=${weathrKEY}`, {method: 'GET'})
    .then(res => res.json())
      .then(data => {
        return parseData(data, city)
      })
      .then(weatherObj => renderWeather($weatherContainer, weatherObj));
}

function parseData(_data, city) {
  let data = _data.data[0];
  localStorage.setItem('cityForWeather', data.city_name);
  return {
    city: city,
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
  return this;
}

function autocompleteHandler() {
  let lat;
  let lng;
  let city;
  const selectedPlace = this.getPlace();
  lat = selectedPlace.geometry.location.lat();
  lng = selectedPlace.geometry.location.lng();
  city = selectedPlace.vicinity;
  localStorage.setItem('latForWeather', `${lat}`);
  localStorage.setItem('lngForWeather', `${lng}`);
  return getWeather(lat, lng, city, $weatherContainer);
}