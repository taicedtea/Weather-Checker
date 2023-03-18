var today = dayjs();
let city = document.querySelector('#cityInput');
let searchBtn = document.querySelector('#searchBtn');

const apiKey = "2c29190c1619626977d7f8a02bf6b35e";

// creates empty array for city history
let cityHistory = [];

//main weather function
function weather() {
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
    // localStorage.setItem("location", name); --------!!!!!
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
  //adds user input into cityHistory array
  if (!cityHistory.includes(city.value)) {
    cityHistory.push(city.value);
    //adds HTML for user input
    let newHistory = `<li class="historyValue mt-4 bg-green ">${cityHistory[cityHistory.length-1]}</li>`; 
    document.querySelector('#searchHistory').innerHTML += newHistory;
    console.log(cityHistory);
  }

  //repeats weather function with clicked on history value
  document.querySelectorAll('.historyValue').forEach(item => {
    item.addEventListener('click', () => {
      city.value = item.innerHTML;
      weather();
    })
  }) 
}
searchBtn.addEventListener('click', weather);
city.addEventListener('keyup', function (event) {
  if (event.code === 'Enter') {
     weather();
  }
});

