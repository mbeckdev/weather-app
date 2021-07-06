let gif = (function () {
  console.log('tbd');
  let searchTerm = 'cats';

  function writeToScreen(urlToShow) {
    let gifHolder = document.getElementById('gif');
    gifHolder.setAttribute('src', urlToShow);
  }

  const _GIF_THING = 'asdfakjdgfaksjdhf';
  let weatherUrl = `https://api.giphy.com/v1/gifs/translate?api_key=${_GIF_THING}&s=${searchTerm}`;
  // api.giphy.com/v1/gifs/trending
  async function getAGif() {
    // tbd
    // const response = await fetch(weatherUrl, { mode: 'cors' });
    // .then(function (response) {
    //   return response.json;
    // })
    // .then(function (response) {
    //   console.log(response);
    //   console.log('gif worked');
    //   writeToScreen(response.data.images.original.url);
    //   // setWeatherStuff(response);
    //   // dom.writeWeather();
    //   // dom.endLoadingAnimation();
    // })
    // .catch((error) => {
    //   console.error('Error:', error);
    // });

    const response = await fetch(
      `https://api.giphy.com/v1/gifs/translate?api_key=${_GIF_THING}&s=${searchTerm}`,
      { mode: 'cors' }
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (response) {
        img.src = response.data.images.original.url;
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return {
    getAGif: getAGif,
  };
})();

export { gif };
