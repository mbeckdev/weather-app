import { weather } from './weather.js';
import { format } from 'date-fns';

let dom = (function () {
  let tempUnit = 'F'; //'C' or 'F'
  const domThings = {
    form: document.getElementById('form'),
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
    fButton: document.getElementById('f-button'),
    cButton: document.getElementById('c-button'),
    dots: document.querySelectorAll('.dot'),
    loading: document.getElementById('loading'),
  };

  function writeWeather() {
    console.log('writing weather');

    // let tempNumberInCorF = undefined;
    // tempNumberInCorF = getTempNumberInCorF();

    domThings.name.textContent = weather.myWeatherObject.name;
    domThings.generalWeatherDescription.textContent =
      weather.myWeatherObject.generalWeatherDescription;

    _writeWeatherTemps();
    _writeSunriseSunset();

    // let leSunset = weather.myWeatherObject.sunset;
    // console.log(leSunset);
  }

  function _writeSunriseSunset() {
    // Initial fake data
    if (weather.myWeatherObject.sunrise == undefined) {
      domThings.sunrise.textContent = '5:36 AM';
      domThings.sunset.textContent = '8:31 PM';
    } else {
      domThings.sunrise.textContent = format(
        weather.myWeatherObject.sunrise,
        'h:mm a'
      );
      domThings.sunset.textContent = format(
        weather.myWeatherObject.sunset,
        'h:mm a'
      );
    }
  }

  function getTempNumberInCorF(kelvin) {
    let theNumber = undefined;

    if (dom.tempUnit == 'F') {
      theNumber = kToF(kelvin);
    } else if (dom.tempUnit == 'C') {
      theNumber = cToF(kelvin);
    } else {
      throw 'Temperature unit is not C or F';
    }
    return theNumber;
  }

  function kToF(kelvin) {
    let fahrenheit = undefined;
    fahrenheit = ((kelvin - 273.15) * 9) / 5 + 32;
    fahrenheit = Math.round(fahrenheit * 1) / 1;
    return fahrenheit;
  }
  function cToF(kelvin) {
    let celcius = undefined;
    celcius = kelvin - 273.15;
    celcius = Math.round(celcius * 1) / 1;
    return celcius;
  }

  function setupInitialDom() {
    _addInitialEventListeners();
    _writeWeatherTemps();
    _writeSunriseSunset();
  }

  function _addInitialEventListeners() {
    document
      .getElementById('f-button')
      .addEventListener('click', _handleTempButtonClick);
    document
      .getElementById('c-button')
      .addEventListener('click', _handleTempButtonClick);
    domThings.form.addEventListener('submit', _formSubmit);
  }

  function _formSubmit(e) {
    // prevent default so the page doesn't reload
    e.preventDefault();
    console.log('form submitted');
    const placeDom = document.getElementById('place');
    let place = placeDom.value;
    weather.getWeatherData(place);
  }

  function _handleTempButtonClick(e) {
    console.log('aaaa');

    if (e.target.id == 'c-button' && dom.tempUnit == 'F') {
      //change to C
      dom.tempUnit = 'C';
      e.target.classList.toggle('selected');
      domThings.fButton.classList.toggle('selected');
      _writeWeatherTemps();
    } else if (e.target.id == 'f-button' && dom.tempUnit == 'C') {
      //change to F
      dom.tempUnit = 'F';
      e.target.classList.toggle('selected');
      domThings.cButton.classList.toggle('selected');
      _writeWeatherTemps();
    }
  }

  function _writeWeatherTemps() {
    let degCorFString = '';
    if (dom.tempUnit == 'C') degCorFString = '\u00B0C';
    if (dom.tempUnit == 'F') degCorFString = '\u00B0F';

    //initial numbers
    if (weather.myWeatherObject.currentTemp == undefined) {
      domThings.currentTemp.textContent = `${getTempNumberInCorF(
        274
      )}${degCorFString}`;
      domThings.highTemp.textContent = `${getTempNumberInCorF(
        280
      )}${degCorFString}`;
      domThings.lowTemp.textContent = `${getTempNumberInCorF(
        260
      )}${degCorFString}`;
    } else {
      domThings.currentTemp.textContent = `${getTempNumberInCorF(
        weather.myWeatherObject.currentTemp
      )}${degCorFString}`;

      domThings.highTemp.textContent = `${getTempNumberInCorF(
        weather.myWeatherObject.tempMax
      )}${degCorFString}`;
      domThings.lowTemp.textContent = `${getTempNumberInCorF(
        weather.myWeatherObject.tempMin
      )}${degCorFString}`;
    }
  }

  function startLoadingAnimation() {
    domThings.loading.style.visibility = 'visible';
    domThings.dots[0].classList.add('is-loading1');
    domThings.dots[1].classList.add('is-loading2');
    domThings.dots[2].classList.add('is-loading3');
  }
  function endLoadingAnimation() {
    domThings.loading.style.visibility = 'hidden';
    domThings.dots[0].classList.remove('is-loading1');
    domThings.dots[1].classList.remove('is-loading2');
    domThings.dots[2].classList.remove('is-loading3');
  }

  return {
    writeWeather,
    setupInitialDom,
    tempUnit,
    startLoadingAnimation,
    endLoadingAnimation,
  };
})();

export { dom };
