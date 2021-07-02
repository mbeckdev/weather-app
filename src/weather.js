import { dom } from './dom.js';

let weather = (function () {
  let myWeatherObject = {};
  function setWeatherStuff(response) {
    let currentTemp = '';
    let sunrise = new Date();
    let sunset = new Date();
    let generalWeather = ''; //clounds
    let generalWeatherDescription = ''; //'overcast clouds'
    let windSpeed = ''; //2.57
    let windGustSpeed = '';
    let windDir = ''; //0
    let percentCloudiness = ''; //90;
    let name = ''; //London;
    let tempMin = ''; //London;
    let tempMax = ''; //London;

    currentTemp = response.main.temp;
    sunrise = new Date(response.sys.sunrise * 1000);
    sunset = new Date(response.sys.sunset * 1000);
    // sunrise = sunrise.toUTCString();
    // sunset = sunset.toUTCString();
    generalWeather = response.weather[0].main; //clounds
    console.log('generalWeather =' + generalWeather);
    generalWeatherDescription = response.weather[0].description; //'overcast clouds'
    windSpeed = response.wind.speed; //2.57
    windDir = response.wind.deg; //0
    windGustSpeed = response.wind.gust; //0
    percentCloudiness = response.clouds.all;
    name = response.name;
    tempMin = response.main.temp_min;
    tempMax = response.main.temp_max;

    myWeatherObject.currentTemp = currentTemp;
    myWeatherObject.sunrise = sunrise;
    myWeatherObject.sunset = sunset;
    myWeatherObject.generalWeather = generalWeather;
    myWeatherObject.generalWeatherDescription = generalWeatherDescription;
    myWeatherObject.windSpeed = windSpeed;
    myWeatherObject.windDir = windDir;
    myWeatherObject.windGustSpeed = windGustSpeed;
    myWeatherObject.percentCloudiness = percentCloudiness;
    myWeatherObject.name = name;
    myWeatherObject.tempMin = tempMin;
    myWeatherObject.tempMax = tempMax;

    console.log(myWeatherObject);
  }
  const _WEATHER_THING = '0107a14fae5cf33892e24c15d71cce7d';
  async function getWeatherData(place) {
    let cityName = place;
    let weatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${_WEATHER_THING}`;

    const response = await fetch(weatherUrl, { mode: 'cors' })
      .then(function (response) {
        // console.log(response.json());
        return response.json();
      })
      .then(function (response) {
        console.log(response);
        setWeatherStuff(response);
        dom.writeWeather();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    // .then(function (response) {
    // });
  }

  return {
    getWeatherData,
    myWeatherObject,
  };
})();

export { weather };
