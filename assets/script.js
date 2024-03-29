var today = dayjs();
let city = document.querySelector('#cityInput');
let searchBtn = document.querySelector('#searchBtn');

const apiKey = "2c29190c1619626977d7f8a02bf6b35e";

//creates empty array for city history
let cityHistory = localStorage.getItem('cityHistory');
cityHistory = cityHistory ? cityHistory.split(',') : [];

//adds history to html
function weatherHistory() {
  for (let i = 0; i < cityHistory.length; i++) {
    let newHistory = `<li class="historyValue mt-4 bg-green ">${cityHistory[i]}</li>`; 
    document.querySelector('#searchHistory').innerHTML += newHistory;
  }
}

//main weather function
function weather() {
  if (!cityHistory.includes(city.value)) {
    cityHistory.push(city.value);
    localStorage.setItem('cityHistory', cityHistory.toString());
    let newHistory = `<li class="historyValue mt-4 bg-green ">${city.value}</li>`; 
    document.querySelector('#searchHistory').innerHTML += newHistory;
  }
  //cnt=6 is used to get current day data and the next 5 days data
  requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city.value}&units=imperial&appid=${apiKey}&cnt=6
  `
  fetch(requestUrl)
  .then((response) => {
    if(!response.ok) {
      alert("Weather not found.");
      throw new Error("Weather not found.");
    }
    return response.json();
  })
  .then((data) => {
    //data for current date
    let { name } = data.city;
    const { icon, description } = data.list[0].weather[0];
    const { speed } = data.list[0].wind;
    const { temp, humidity } = data.list[0].main;
    //populates HTML for current day
    document.querySelector('#currentCity').innerHTML = name;
    document.querySelector('#currentDate').innerHTML = today.format('MM/DD/YYYY');
    document.querySelector('#icon').src = src = "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector('#description').innerHTML = description;
    document.querySelector('#temp').innerHTML = `Temperature: ${temp} &deg;F`;
    document.querySelector('#wind').innerHTML = `Wind: ${speed} mp/h`;
    document.querySelector('#humidity').innerHTML = `Humidity: ${humidity}%`;
    //five day forecast
    let dailyWeatherContainer = document.querySelector('#dailyWeatherContainer');
    var dailyHTML = '';
    for (let i = 1; i < data.list.length; i++) {
      let { icon, description } = data.list[i].weather[0];
      let { speed } = data.list[i].wind;
      let { temp, humidity } = data.list[i].main;
      dailyHTML += `<div class="fiveDayCard singleCard ml-2 mr-2"><img src="https://openweathermap.org/img/wn/${icon}.png">
      <p>${today.add(i, 'day').format('MM/DD/YYYY')}<p><br>
      <p>Temperature: ${temp} &deg;F</p>
      <p>${description}</p><br>
      <p>Wind Speed: ${speed}</p><br>
      <p>Humidity: ${humidity}%</p></div>`;
    }
    //adds generated HTML to correct div
    dailyWeatherContainer.innerHTML = dailyHTML;
  })
  //necessary to allow users to continue to be able to click on history
  getHistoryValue();
}

//repeats weather function with clicked on history value
function getHistoryValue() {
  document.querySelectorAll('.historyValue').forEach(item => {
    item.addEventListener('click', () => {
      city.value = item.innerHTML;
      weather();
    })
  })
}

//adds functionality to search buttton
searchBtn.addEventListener('click', weather);
//calls weather function on 'enter' key press while in textbox
city.addEventListener('keyup', function (event) {
  if (event.code === 'Enter') {
     weather();
  }
});

weatherHistory();
getHistoryValue();