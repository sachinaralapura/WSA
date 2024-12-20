const weatherDataEl = document.getElementById("weather-data");
const cityInputEl = document.getElementById("city-input");
const formEl = document.querySelector("form");

formEl.addEventListener("submit", async (event) => {
    event.preventDefault();
    const cityValue = cityInputEl.value;
    await getLongitudeAndLatitude(cityValue);
})


async function getLongitudeAndLatitude(city) {
    const url = `https://nominatim.openstreetmap.org/search?q=${city}&format=json`;
    const res = await fetch(url);
    const [data] = await res.json();
    await getWeatherData(data.lat, data.lon);
}

async function getWeatherData(lat, lon) {
    try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,rain,wind_speed_10m`;
        console.log(url);
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error("Could not fetch weather data");
        }
        const data = await res.json()
        const temperature = Math.round(data.current.temperature_2m);
        const description = data.current.rain;
        const wind = data.current.wind_speed_10m;
        const details = [`Temperature: ${temperature}${data.current_units.rain} `, `Rain : ${description}${data.current_units.rain} `, `Wind : ${wind}${data.current_units.wind_speed_10m}`];

        weatherDataEl.querySelector(".details").innerHTML = details.map((detail) => `<div>${detail}</div>`).join("");
    } catch (err) {
        console.log(err);
        weatherDataEl.querySelector(".details").innerHTML = `failed to fetch weather data`;
    }
}