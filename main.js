var newButton = document.getElementById('newButton');
var inputField = document.getElementById('input');
var correctTime = document.getElementById('timeDate');

let Day = dayjs();
correctTime.textContent = Day.format('MMM DD, YYYY');


function getAPI() {
    var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + inputField.value + '&APPID=938fb3720289098948304613a4e3a426&units=imperial';
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

                    for (var i = 0; i < data.list.length; i++) {
                        if (data.list[i].dt_txt.includes('12:00:00')) {
                            var forecastCard = document.createElement('div');
                            var innerTemp = document.createElement('p');
                            var innerWind = document.createElement('p');
                            var innerHumidity = document.createElement('p');
                            var weatherIcon = document.createElement('p');
                            var newDay = document.createElement('p');

                            // var formatDate = Date.parse(data.list[i].dt_txt);

                            var dayWeather = dayjs.unix(data.list[i].dt).format('MMM D, YYYY');
                          

                    
                    
                    
                            newDay.textContent = dayWeather;


                            innerTemp.textContent = "Temp " + data.list[i].main.temp;
                            innerWind.textContent = "Wind " + data.list[i].wind.speed + " MPH";
                            innerHumidity.textContent = "Humidity " + data.list[i].main.humidity + "%";
                    

                        
                            forecastCard.append(newDay, innerTemp, innerWind, innerHumidity, weatherIcon);

                            document.getElementById('display').append(forecastCard);

                        }

                    }

                })

        })

}


// Event listener - when user clicks on Search Button. 

newButton.addEventListener('click', function (event) {

    event.preventDefault();

    getAPI();

});





