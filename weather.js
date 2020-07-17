const weather = document.querySelector(".js-weather");

const API_KEY = "75277991d7c149362d971de24ae8419a";
const COORDS = 'coords'

function getWeather(lat, lng){
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`)
  .then(response => response.json())
  .then(json => {
    const temperature = json.main.temp;
    const place = json.name;
    weather.innerText = `${temperature}°C @ ${place}`;
  })
}


function saveCoords(coordsObj){
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position){
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError(){
  console.log('Can\'t access geo location')
}

function askForCoords(){
  // navigator API사용
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError)
}

function loadCoords(){
  const loadedCoords = localStorage.getItem(COORDS);
  if(loadedCoords === null){
    askForCoords();  // 좌표를 요청
  } else {
    // getWeather
    const parseCoords = JSON.parse(loadedCoords);
    getWeather(parseCoords.latitude, parseCoords.longitude)
  }
}

function init(){
  loadCoords();
}

init();