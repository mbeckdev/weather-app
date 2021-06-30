let weather = (function () {
  let myWeatherObject = {};
  function setWeatherStuff(response) {
    let currentTemp = '';
    let sunrise = '';
    let sunset = '';
    let generalWeather = ''; //clounds
    let generalWeatherDescription = ''; //'overcast clouds'
    let windSpeed = ''; //2.57
    let windGustSpeed = '';
    let windDir = ''; //0
    let percentCloudiness = ''; //90;

    currentTemp = response.main.temp;
    sunrise = new Date(response.sys.sunrise * 1000);
    sunset = new Date(response.sys.sunset * 1000);
    sunrise = sunrise.toUTCString();
    sunset = sunset.toUTCString();
    generalWeather = response.weather[0].main; //clounds
    console.log('generalWeather =' + generalWeather);
    generalWeatherDescription = response.weather[0].description; //'overcast clouds'
    windSpeed = response.wind.speed; //2.57
    windDir = response.wind.deg; //0
    windGustSpeed = response.wind.gust; //0
    percentCloudiness = response.clouds.all;

    myWeatherObject.currentTemp = currentTemp;
    myWeatherObject.sunrise = sunrise;
    myWeatherObject.sunset = sunset;
    myWeatherObject.generalWeather = generalWeather;
    myWeatherObject.generalWeatherDescription = generalWeatherDescription;
    myWeatherObject.windSpeed = windSpeed;
    myWeatherObject.windDir = windDir;
    myWeatherObject.windGustSpeed = windGustSpeed;
    myWeatherObject.percentCloudiness = percentCloudiness;
    console.log(myWeatherObject);
  }
  const _WEATHER_THING = '0107a14fae5cf33892e24c15d71cce7d';
  async function getWeatherData() {
    let cityName = 'Denver';
    let weatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${_WEATHER_THING}`;
    console.log(weatherUrl);

    const response = await fetch(weatherUrl, { mode: 'cors' })
      .then(function (response) {
        // console.log(response.json());
        return response.json();
      })
      .then(function (response) {
        console.log(response);
        setWeatherStuff(response);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  return {
    getWeatherData,
  };
})();

export { weather };
