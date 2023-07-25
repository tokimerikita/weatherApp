let toggler = document.getElementById('toggle');
let slider = document.getElementById('slider');
let city = ""
let input = document.getElementById('city')
let searchweather = document.getElementById('searchweather')
let api = "18e0593c253c0e64d1768bae6855cd72"
let hour
let latitude
let longitude
toggler.addEventListener('click', function (e) {
    if (slider.classList.contains('slider_open')) {
        slider.setAttribute("class", 'slider_close')
    }
    else {
        slider.setAttribute("class", 'slider_open')
    }
})
input.addEventListener('keyup', function (e) {
    if (e.key == "Enter") {
        city = input.value
        input.value = ""
        if (city === "") {
            document.getElementById("warning").innerText = "*Please Enter the city Name"
            console.log("Hiii")
        }
        else {
            document.getElementById("warning").innerText = ""
            loadweather(city)
        }
    }
})
searchweather.addEventListener('click', function (e) {
    city = input.value
    input.value = ""
    if (city === "") {
        document.getElementById("warning").innerText = "*Please Enter the city Name"
    }
    else {
        document.getElementById("warning").innerText = ""
        loadweather(city)
    }
})


//*Load current location data

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(UserLoacationWeather);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function UserLoacationWeather(position) {
    // x.innerHTML = "Latitude: " + position.coords.latitude +
    //     "<br>Longitude: " + position.coords.longitude;
    latitude = position.coords.latitude
    longitude = position.coords.longitude
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${api}`
    fetch(url).then(function (response) {
        // console.log(response);
        if (!response.ok) throw Error(response.statusText);
        return response.json();
    }).then(function (data) {
        console.log(data);
        displayweather(data);
        dayNightMode(data);
        document.getElementById("warning").innerText = ""
    }).catch(function (err) {
        document.getElementById("warning").innerText = err
    })
}





function loadweather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api}`;
    fetch(url).then(function (response) {
        // console.log(response);
        if (!response.ok) throw Error(response.statusText);
        return response.json();
    }).then(function (data) {
        console.log(data);
        displayweather(data);
        dayNightMode(data);
        document.getElementById("warning").innerText = ""
    }).catch(function (err) {
        document.getElementById("warning").innerText = err
    })
}

function displayweather(data) {
    document.querySelector("#img").className = "";
    setImage(data);

    document.querySelector("#degrees").className = "";
    document.querySelector("#degrees").innerHTML = (data.main.temp).toFixed(1) + '&deg;<span style="font-size: 1.2rem;margin-top: -10px;">C</span>';

    document.querySelector("#bar").className = "";
    document.querySelector("#bar").textContent = "|";

    document.querySelector("#city-name").className = "";
    document.querySelector("#city-name").textContent = data.name;

    document.querySelector("#description").className = "";
    document.querySelector("#description").textContent = data.weather[0].description;

    document.getElementById("humidity").className = ""
    document.getElementById("humidity").textContent = data.main.humidity + '%';

    document.getElementById("Pressure").className = ""
    document.getElementById("Pressure").textContent = data.main.pressure + " hPa"

    document.getElementById("wind").className = ""
    document.getElementById("wind").textContent = data.wind.speed + "m/s"

    document.getElementById("visibility").className = ""
    document.getElementById("visibility").textContent = data.visibility
    setTimeout(function () {
        document.querySelector("#img").classList.add("animatee");
        document.querySelector("#degrees").classList.add("animatee");
        document.querySelector("#bar").classList.add("animatee");
        document.querySelector("#city-name").classList.add("animatee");
        document.querySelector("#description").classList.add("animatee");
        document.querySelector("#humidity").classList.add("animatee");
    }, 300);
}

function setImage(data) {
    if (data.weather[0].main === "Clear") {
        if (data.weather[0].icon.endsWith("d")) {
            document.querySelector("#img").src = "sun.svg";
        }
        else if (data.weather[0].icon.endsWith("n")) {
            document.querySelector("#img").src = "1821-night-sky-moon-stars.svg";
        }
    }

    if (data.weather[0].main === "Snow") {
        document.querySelector("#img").src = "snow.svg";
    }

    if (data.weather[0].main === "Thunderstorm") {
        document.querySelector("#img").src = "thunderstorm.svg";
    }

    if (data.weather[0].main === "Drizzle" ||
        data.weather[0].main === "Mist" ||
        data.weather[0].main === "Smoke" ||
        data.weather[0].main === "Haze" ||
        data.weather[0].main === "Dust" ||
        data.weather[0].main === "Fog" ||
        data.weather[0].main === "Sand" ||
        data.weather[0].main === "Dust" ||
        data.weather[0].main === "Ash" ||
        data.weather[0].main === "Squall" ||
        data.weather[0].main === "Tornado") {
        document.querySelector("#img").src = "drizzle.svg";
    }

    if (data.weather[0].main === "Clouds") {
        if (data.weather[0].description === "few clouds") {
            // document.querySelector("#img").src = "few_clouds.svg";
            if (data.weather[0].icon.endsWith("d")) {
                document.querySelector("#img").src = "few_clouds.svg";
            }
            else if (data.weather[0].icon.endsWith("n")) {
                document.querySelector("#img").src = "few-clouds-night.svg";
            }
        }
        else
            document.querySelector("#img").src = "overcast_clouds.svg";
    }

    if (data.weather[0].main === "Rain") {
        // querySelector("#img").src = "light_rain.svg";
        if (data.weather[0].icon.endsWith("d")) {
            document.querySelector("#img").src = "light_rain.svg";
        }
        else if (data.weather[0].icon.endsWith("n")) {
            document.querySelector("#img").src = "light_rain-night.svg";
        }
    }
}



function dayNightMode(data) {
    let date = new Date();
    hour = date.getHours();

    if (data.weather[0].icon.endsWith("d")) {
        document.body.style.background = "linear-gradient(0.50turn, white, #33adff, white)";
    }
    else
        document.body.style.background = "linear-gradient(0.50turn, black, #33adff, black)";
}

window.addEventListener('load', getLocation);
// show = document.getElementById('show');
// show.addEventListener('click', function (e) {
//     if (document.getElementById("table").style.display === 'none') {
//         console.log(document.getElementById("table").style.display)
//         console.log(" in if Showing table")
//         document.getElementById("table").style.display = 'block';
//         show.innerHTML = `Less info <i class="fa-solid fa-circle-info"></i>`
//     }
//     else {
//         console.log(document.getElementById("table").style.display)
//         console.log(" in else closing table")
//         document.getElementById("table").style.display = 'none';
//         show.innerHTML = 'More info <i class="fa-solid fa-circle-info"></i>'
//     }
// })


let box = document.getElementById('table'),
       btn = document.getElementById('show');

btn.addEventListener('click', function () {

    if (box.classList.contains('hidden')) {
        console.log("hidden is removed")
        box.classList.remove('hidden');
        setTimeout(function () {
            box.classList.remove('visuallyhidden');
        }, 200);
        btn.innerHTML = `Less info <i class="fa-solid fa-circle-info"></i>`
    } else {
        box.classList.add('visuallyhidden');
        box.addEventListener('transitionend', function (e) {
            box.classList.add('hidden');
        }, {
            capture: false,
            once: true,
            passive: false
        });
        btn.innerHTML = 'More info <i class="fa-solid fa-circle-info"></i>'
    }

}, false);