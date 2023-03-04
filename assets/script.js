var today = dayjs();
let city = document.querySelector('#cityInput');
let searchBtn = document.querySelector('#searchBtn');

function test() {
  console.log(today.format('MM/DD/YYYY'));
}

const apiKey = "2c29190c1619626977d7f8a02bf6b35e";
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
    console.log(data.city.name);
    console.log(data.list[0].weather)
    //data for current date
    const { name } = data.city;
    const { icon, description } = data.list[0].weather[0];
    const { speed } = data.list[0].wind;
    const { temp, humidity } = data.list[0].main;
    let dailyWeatherContainer = document.querySelector('#dailyWeatherContainer');
    //populates HTML for current day
    document.querySelector('#currentCity').innerHTML = name;
    document.querySelector('#icon').src = src = "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector('#description').innerHTML = description;
    document.querySelector('#temp').innerHTML = `Temperature: ${temp} &deg;F`;
    document.querySelector('#wind').innerHTML = `Wind: ${speed} mp/h`;
    document.querySelector('#humidity').innerHTML = `Humidity: ${humidity}%`;
    //data for 5 days after current date
    var dailyHTML = '';
    for (let i = 1; i < data.list.length; i++) {
      let { icon, description } = data.list[i].weather[0];
      let { speed } = data.list[i].wind;
      let { temp, humidity } = data.list[i].main;
      console.log(temp);
      dailyHTML += `<div class="fiveDayCard"><img src="https://openweathermap.org/img/wn/${icon}.png">
      <p>Temperature: ${temp} &deg;F</p>
      <p>${description}</p><br>
      <p>Wind Speed: ${speed}</p><br>
      <p>Humidity: ${humidity}%</p></div>`;
      // let futureDates = today.add(1, 'day').format(MM/DD/YYYY);

    }
    dailyWeatherContainer.innerHTML = dailyHTML;
  })
}

searchBtn.addEventListener('click', weather);
searchBtn.addEventListener('click', fiveDay);

