const apiKey = "a03112ca789460062922f84d0059b4ce";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const feelsLike = document.getElementById("feelsLike");
const weatherIcon = document.getElementById("weatherIcon");
const error = document.getElementById("error");

async function getWeather(city) {

    if (!city) {
        error.textContent = "Please enter a city name.";
        return;
    }

    error.textContent = "";

    try {

        const url =
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        cityName.textContent = `${data.name}, ${data.sys.country}`;

        temperature.textContent = `${Math.round(data.main.temp)}°C`;

        description.textContent = data.weather[0].description;

        humidity.textContent = `${data.main.humidity}%`;

        wind.textContent = `${Math.round(data.wind.speed * 3.6)} km/h`;

        feelsLike.textContent = `${Math.round(data.main.feels_like)}°C`;

        weatherIcon.src =
            `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    } catch (err) {

        error.textContent = "City not found. Please try again.";

        cityName.textContent = "--";
        temperature.textContent = "--°C";
        description.textContent = "--";
        humidity.textContent = "--%";
        wind.textContent = "-- km/h";
        feelsLike.textContent = "--°C";
        weatherIcon.src = "";
    }
}

searchBtn.addEventListener("click", () => {
    getWeather(cityInput.value.trim());
});

cityInput.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {
        getWeather(cityInput.value.trim());
    }

});