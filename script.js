const searchForm = document.querySelector('.search-loaction');
const cityValue = document.querySelector('.search-loaction input');
const cityName = document.querySelector('.city-name p');
const cardBody = document.querySelector('.card-body');
const timeImage = document.querySelector('.card-top img');
const cardInfo = document.querySelector('.back-card');

const spitOutCelcius = (kelvin) => {
    celcius = Math.round(kelvin - 273.15);
    return celcius;
}
const isDayTime = (icon) => {
    if (icon.includes('d')) { return true }
    else { return false }
}
updateWeatherApp = (city) => {
    
    console.log(city);
    const imageName = city.weather[0].icon;
    const iconSrc = `https://openweathermap.org/img/wn/${imageName}@2x.png`
    cityName.textContent = city.name;
    cardBody.innerHTML = `
    <div class="card-mid row">
            <div class="col-8 text-center temp">
              <span>${spitOutCelcius(city.main.temp)}&deg;C</span>
            </div>
            <div class="col-4 condition-temp">
              <p class="condition">${city.weather[0].description}</p>
              <p class="high">${spitOutCelcius(city.main.temp_max)}&deg;C</p>
              <p class="low">${spitOutCelcius(city.main.temp_min)}&deg;C</p>
            </div>
          </div>
          <div class="icon-container card shadow mx-auto">
            <img src="${iconSrc}" alt="" />
          </div>
          <div class="card-bottom px-5 py-4 row">
            <div class="col text-center">
              <p>${spitOutCelcius(city.main.feels_like)}&deg;C</p>
              <span>Feels Like</span>
            </div>
            <div class="col text-center">
              <p>${city.main.humidity}%</p>
              <span>Humidity</span>
            </div>
          </div>
    `;
    if (isDayTime(imageName)) {
        console.log('day');
        timeImage.setAttribute('src', 'https://raw.githubusercontent.com/snjtsam/weather_app/fa78a9906984f534d775a5ff5fa1a0a6ba269efa/day_image.svg');
        if (cityName.classList.contains('text-white')) {
            cityName.classList.remove('text-white');
        } else {
            cityName.classList.add('text-black');
        }

    } else {
        console.log('night');
        timeImage.setAttribute('src', 'https://raw.githubusercontent.com/snjtsam/weather_app/fa78a9906984f534d775a5ff5fa1a0a6ba269efa/night_image.svg');
        if (cityName.classList.contains('text-black')) {
            cityName.classList.remove('text-black');
        } else {
            cityName.classList.add('text-white');
        }

    }

    cardInfo.classList.remove('d-none');
}



//add an event listner to the form
searchForm.addEventListener('submit', e => {
    e.preventDefault();
    const citySearched = cityValue.value.trim();
    console.log(citySearched);
    searchForm.reset();
  
    if(!cityValue){
        alert("Nothing to Search");
    }else{
    requestCity(citySearched)
        .then((data) => {
            updateWeatherApp(data);
        })
        .catch((error) => { console.log(error) })
    }
})
// const d = new Date();
// let hour = d.getHours();
// console.log(hour)
// if(hour>=6 && hour<17){
//     if (5 <= hour && hour < 8) {//Morning
//         document.write('<body style="background:black">')
// }
// if(hour>=17 && hour<=19){
//     document.write('<body style="background:black">')
// }
// if(hour>=19 && hour<=6){
//     document.write('<body style="background:black">');
// }
// }
	var d = new Date();
	var n = d.getHours();
	if (n > 19 || n < 6)
	  // If time is after 7PM or before 6AM, apply night theme to ‘body’
	  document.body.className = "night";
	else if (n > 17 && n < 19)
	  // If time is between 4PM – 7PM sunset theme to ‘body’
	  document.body.className = "evening";
	else
	  // Else use ‘day’ theme
	  document.body.className = "day";
