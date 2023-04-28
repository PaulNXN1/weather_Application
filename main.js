var newButton = document.getElementById('newButton');
var inputField = document.getElementById('input');
var correctTime = document.getElementById('timeDate');
var historyList = [];
var finalSearch = document.getElementById('pastSearch');

function loadInput() {
    getAPI(inputField.value);
    historyList.push(inputField.value);
    localStorage.setItem('addList', JSON.stringify(historyList));
    renderCities();
}

function init(){
    // gets data from localstorage if available
    var listTemp = localStorage.getItem("addList");
    if(listTemp){ // if exists
      historyList = JSON.parse(listTemp);
    }
    renderCities();
  }
 
  init();

// Code for dayJS

let Day = dayjs();
correctTime.textContent = Day.format('MMM DD, YYYY');

// main function that pulls API 

function getAPI(city) {
    var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&APPID=938fb3720289098948304613a4e3a426&units=imperial';
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })


        // Current weather log

        .then(function (data) {

            let currentTemp = document.getElementById("currentTemp");
            currentTemp.textContent = "Temp: " + data.main.temp + " F";

            let currentWind = document.getElementById("currentWind");
            currentWind.textContent = "Wind: " + data.wind.speed + " Speed MPH";

            let currentHumidity = document.getElementById("currentHumidity");
            currentHumidity.textContent = "Humidity: " + data.main.humidity + "%";


            // Code for the 5-Day Forecast

            var fiveDayUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + data.coord.lat + '&lon=' + data.coord.lon + '&appid=938fb3720289098948304613a4e3a426&units=imperial';
            fetch(fiveDayUrl)
                .then(function (response) {
                    return response.json();
                })


                .then(function (data) {
                    console.log(data);

                    document.getElementById('display').innerHTML = "";

                    for (var i = 0; i < data.list.length; i++) {
                        if (data.list[i].dt_txt.includes('12:00:00')) {
                            var forecastCard = document.createElement('div');
                            var innerTemp = document.createElement('p');
                            var innerWind = document.createElement('p');
                            var innerHumidity = document.createElement('p');
                            var weatherIcon = document.createElement('p');
                            var newDay = document.createElement('p');
                            var weatherImage = document.createElement('img');
                           

                            // var formatDate = Date.parse(data.list[i].dt_txt);

                            var dayWeather = dayjs.unix(data.list[i].dt).format('MMM D, YYYY');
                          
                                console.log(`https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png`);
                    
                           // `https://openweathermap.org/img/wn/10d@2x.png`   - the URL for the icon page. 
                    
                            newDay.textContent = dayWeather;
                            innerTemp.textContent = "Temp: " + data.list[i].main.temp;
                            innerWind.textContent = "Wind: " + data.list[i].wind.speed + " MPH";
                            innerHumidity.textContent = "Humidity: " + data.list[i].main.humidity + "%";
                            weatherImage.setAttribute("src", `https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png`);

                        
                            forecastCard.append(newDay, innerTemp, innerWind, innerHumidity, weatherImage);

                            document.getElementById('display').append(forecastCard);

                        }

                    }

                })

        })

}



// Event listener - when user clicks on Search Button. 

newButton.addEventListener('click', function (event) {

    event.preventDefault();

    loadInput();

});


function renderCities() {

    finalSearch.innerHTML = "";

    for (var i = 0; i < historyList.length; i++) {
        let city = historyList[i];
        let cityButton = document.createElement('button');

        cityButton.style.background = 'grey';
        cityButton.style.borderRadius = '25px';

        cityButton.dataset.city = city;
        cityButton.value = city;
        cityButton.textContent = city;
        finalSearch.appendChild(cityButton);

        cityButton.addEventListener('click', function(event){
            
            getAPI(event.target.dataset.city);

        })
    }

}


