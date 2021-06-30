import { weather } from './weather.js';

let dom = (function () {
  const domThings = {
    currentTemp: document.getElementById('currentTemp'),
    sunrise: document.getElementById('sunrise'),
    sunset: document.getElementById('sunset'),
    generalWeather: document.getElementById('generalWeather'),
    generalWeatherDescription: document.getElementById(
      'generalWeatherDescription'
    ),
    windSpeed: document.getElementById('windSpeed'),
    windDir: document.getElementById('windDir'),
    windGustSpeed: document.getElementById('windGustSpeed'),
    percentCloudiness: document.getElementById('percentCloudiness'),
  };

  function writeWeather() {
    console.log('writing weather');

    domThings.currentTemp.textContent = `${kToF(
      weather.myWeatherObject.currentTemp
    )}\u00B0F`;
  }

  function kToF(kelvin) {
    let fahrenheit = undefined;
    fahrenheit = ((kelvin - 273.15) * 9) / 5 + 32;
    fahrenheit = Math.round(fahrenheit * 10) / 10;
    return fahrenheit;
  }

  return {
    writeWeather,
  };
})();

export { dom };
