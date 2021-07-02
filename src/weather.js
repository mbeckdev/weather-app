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
    let timezone = ''; //3600 London, Denver -21600

    //Translate response time to your local computer time so it looks like city time
    // because dates are always in relation to your local device
    timezone = response.timezone;
    sunrise = getCityTime(response.sys.sunrise, timezone);
    sunset = getCityTime(response.sys.sunset, timezone);
    console.log('city time sunrise = ' + sunrise);
    console.log('city time sunset = ' + sunset);

    currentTemp = response.main.temp;
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
    myWeatherObject.timezone = timezone;

    console.log(myWeatherObject);
  }

  function getCityTime(sunriseOrSunset, cityTimeZone) {
    let returnTime = new Date();
    let anHourInMilliseconds = 1000 * 60 * 60;

    // // london gmt+1     denver gmt utc-6
    // // if you are in timezone UTC-1, outputs 60
    // // if you are in timezone UTC+3, outputs -180
    // // 360 so UTC+6
    //Returns the difference between UTC and the local time zone, in minutes
    let timezoneHereOffsetInMin = new Date().getTimezoneOffset();
    let timezoneHereOffsetToUTCInHr = timezoneHereOffsetInMin / 60;
    //timezone = shift in seconds from utc ==cityTimeZone
    let cityTimezoneToUTCInHrs = cityTimeZone / 60 / 60;

    returnTime = new Date(
      sunriseOrSunset * 1000 +
        anHourInMilliseconds * timezoneHereOffsetToUTCInHr +
        anHourInMilliseconds * cityTimezoneToUTCInHrs
    );
    return returnTime;
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
