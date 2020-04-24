// Create constants
const cityInputEl = document.getElementById("city-input");
const searchButtonEl = document.getElementById("search-button");
const cityNameEl = document.getElementById("city-name");
const currentTempEl = document.getElementById("temperature");
const currentHumidityEl = document.getElementById("humidity");
const currentWindEl = document.getElementById("wind-speed");
const currentUVEl = document.getElementById("UV-index");
var searchHistory = JSON.parse(localStorage.getItem("search")) || [];
console.log(searchHistory);

// when search button is clicked, read city name typed by the user

// using city name, get request from open weather map api

// using saved city name, execute 5 day forecast request from open weather map api

// display response for 5 day forecast underneath current conditions

// add event listener to search button
    // call search history

// add function to render search history

// create search history function and call when search button is clicked
