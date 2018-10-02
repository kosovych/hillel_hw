function initAutocomplete() {
  const input = document.querySelector('#google-places');
  const autocomplete = new google.maps.places.Autocomplete(
     input,
     { types: ['geocode'] }
  );
  
  autocomplete.addListener('place_changed', () => {
    const selectedPlace = autocomplete.getPlace();
    console.log(selectedPlace);
  });
}

// Add google places script
const script = document.createElement('script');
script.src = 'https://maps.googleapis.com/maps/api/js?libraries=places&callback=initAutocomplete';

document.body.appendChild(script);