// function getApi() {
//   var requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=2c29190c1619626977d7f8a02bf6b35e';

//   fetch(requestUrl)
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data)
//     });
// }

var city = document.querySelectorAll('#cityInput');
var searchBtn = document.querySelectorAll('#searchBtn');

const apiKey = "2c29190c1619626977d7f8a02bf6b35e";
function weather() {
  requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=atlanta&appid=${apiKey}&cnt=5
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
    console.log(data)
  })
}

// searchBtn.addEventListener('click', weather());
//requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city.value}&appid=${apiKey}&cnt=5`