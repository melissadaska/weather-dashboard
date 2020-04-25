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

// create a API key constant
const APIKey = "b776531cc2c9f6ed2bb5784b21325065";

// when search button is clicked, read city name typed by the user
// using city name, get request from open weather map api
function getWeather(cityName) {
    let weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid" + APIKey;
    fetch(weatherURL)
    .then(function(response) {
        console.log(response);

        const currentDate = newDate(response.data.dt*1000);
        console.log(currentDate);
        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();
        cityNameEl.innerHTML = response.data.name + " (" + month + "/" + day + "/" + year + ") ";
        currentTempEl.innerHTML = "Temperature: " + k2f(response.data.main.temp) + "&#176F";
        currentHumidityEl.innerHTML = "Humidity: " + response.data.main.humidity + "%";
        currentWindEl.innerHTML = "Wind Speed: " + response.data.wind.speed + " MPH";
    let lat = response.data.coord.lat;
    let lon = response.data.coord.lon;
    let UVWeatherURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey + "&cnt=1";
    fetch(UVWeatherURL)
    .then(function(response) {
        letUVIndex = document.createElement("span");
        UVIndex.setAttribute("class", "badge badge-danger");
        UVIndex.innerHTML = response.data[0].value;
        currentUVEl.innerHTML = "UV Index: ";
        currentUVEl.append(UVIndex);
    });

    // using saved city name, execute 5 day forecast request from open weather map api
    let cityID = response.data.id;
    let forecastURL = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityID + "&appid=" + APIKey;
    fetch(forecastURL)
    .then(function(response) {
        console.log(response);
        const forecastEl = document.querySelectorAll(".forecast");
        for (i = 0; i < forecastEl.length; i++) {
            forecastEl[i].innerHTML = "";
            const forecastIndex = i*8 + 4;
            const forecastDate = newDate(response.data.list[forecastIndex].dt * 1000);
            const forecastDay = forecastDate.getDate();
            const forecastMonth = forecastDate.getMonth() + 1;
            const forecastYear = forecastDate.getFullYear();
            const forecastDateEl = document.createElement("p");
            forecastDateEl.setAttribute("class","mt-3 mb-0 forecast-date");
            forecastDateEl.innerHTML = forecastMonth + "/" + forecastDay + "/" + forecastYear;
            forecastEl[i].append(forecastDateEl);
            const forecastWeatherEl = document.createElement("img");
            forecastWeatherEl.setAttribute("src","https://openweathermap.org/img/wn/" + response.data.list[forecastIndex].weather[0].icon + "@2x.png");
            forecastWeatherEl.setAttribute("alt",response.data.list[forecastIndex].weather[0].description);
            forecastEl[i].append(forecastWeatherEl);
            const forecastTempEl = document.createElement("p");
            forecastTempEl.innerHTML = "Temp: " + k2f(response.data.list[forecastIndex].main.temp) + " &#176F";
            forecastEl[i].append(forecastTempEl);
            const forecastHumidityEl = document.createElement("p");
            forecastHumidityEl.innerHTML = "Humidity: " + response.data.list[forecastIndex].main.humidity + "%";
            forecastEl[i].append(forecastHumidityEl);
            }
        })
    });
}
    
// add event listener to search button
searchButtonEl.addEventListener("click", function() { 
    searchTerm = cityInputEl.value;
    getWeather(searchTerm);
    searchHistory.push(searchTerm);
    localStorage.setItem("search", JSON.stringify(searchHistory));
    // call search history
})
    

// add function to render search history

// create search history function and call when search button is clicked
