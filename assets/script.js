let city = document.querySelector('#cityInput');
let searchBtn = document.querySelector('#searchBtn');


const apiKey = "2c29190c1619626977d7f8a02bf6b35e";
function weather() {
  requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=imperial&appid=${apiKey}
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
    console.log(data);
    //destructures data
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { speed } = data.wind;
    const { temp, humidity } = data.main;
    // //populates HTML for current day
    document.querySelector('#currentCity').innerHTML = name;
    document.querySelector('#icon').src = src = "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector('#description').innerHTML = description;
    document.querySelector('#temp').innerHTML = `Temperature: ${temp} &deg;F`;
    document.querySelector('#wind').innerHTML = `Wind: ${speed} mp/h`;
    document.querySelector('#humidity').innerHTML = `Humidity: ${humidity}%`;
  })
}

searchBtn.addEventListener('click', weather);

// searchBtn.addEventListener('keyup', function(e) {
//   if (e.key === "enter") {
//     console.log(working);
//   }
// });