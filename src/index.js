'use strict';

import css from './styles.css';
import { weather } from './weather.js';
import { gif } from './gif.js';
// import format from 'date-fns/format';

// weather.getWeatherData();
console.log('a');

const form = document.getElementById('form');
form.addEventListener('submit', formSubmit);

function formSubmit(e) {
  // prevent default so the page doesn't reload
  e.preventDefault();
  console.log('form submitted');
  const placeDom = document.getElementById('place');
  let place = placeDom.value;
  weather.getWeatherData(place);
}
