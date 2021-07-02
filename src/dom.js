import { weather } from './weather.js';
import { format } from 'date-fns';

let dom = (function () {
  const domThings = {
    currentTemp: document.getElementById('currentTemp'),
    sunrise: document.getElementById('sunrise'),
    sunset: document.getElementById('sunset'),
    generalWeather: document.getElementById('generalWeather'),
    generalWeatherDescription: document.getElementById('weather-description'),
    windSpeed: document.getElementById('windSpeed'),
    windDir: document.getElementById('windDir'),
    windGustSpeed: document.getElementById('windGustSpeed'),
    percentCloudiness: document.getElementById('percentCloudiness'),
    name: document.getElementById('name'),
    highTemp: document.getElementById('high-temp'),
    lowTemp: document.getElementById('low-temp'),
  };

  function writeWeather() {
    console.log('writing weather');

    domThings.name.textContent = weather.myWeatherObject.name;
    domThings.generalWeatherDescription.textContent =
      weather.myWeatherObject.generalWeatherDescription;

    domThings.currentTemp.textContent = `${kToF(
      weather.myWeatherObject.currentTemp
    )}\u00B0F`;

    domThings.highTemp.textContent = `${kToF(
      weather.myWeatherObject.tempMax
    )}\u00B0F`;
    domThings.lowTemp.textContent = `${kToF(
      weather.myWeatherObject.tempMin
    )}\u00B0F`;

    domThings.sunrise.textContent = format(
      weather.myWeatherObject.sunrise,
      'h:mm a'
    );
    domThings.sunset.textContent = format(
      weather.myWeatherObject.sunset,
      'h:mm a'
    );
    let leSunset = weather.myWeatherObject.sunset;
    console.log(leSunset);
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
