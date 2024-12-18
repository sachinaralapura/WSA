const searchBtn = document.getElementById("searchBtn");
const countryInput = document.getElementById("countryInput");
const container = document.getElementById("container");
const borders = document.getElementById("borders");

searchBtn.addEventListener("click", async () => {

    let countryName = countryInput.value.trim();
    countryName = countryName.toLowerCase();
    if (countryName === "") {
        alert("Please enter a country name");
        return;
    }

    try {
        let [data] = await getCountryData(countryName);
        renderCountry(data);
        await renderBorders(data.borders);
    }
    catch (err) {
        container.innerHTML = `<h3>Country not found</h3>`
    }
});


async function getCountryData(countryName) {
    let response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`)
    let data = await response.json();
    return data;
}

async function getCountryCodeData(countryCode) {
    let response = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`);
    let data = await response.json();
    return data;
}


function renderCountry(country) {
    let html = generateCountryCard(country);
    container.innerHTML = "";
    container.insertAdjacentHTML("beforeend", html);
}

async function renderBorders(borderCode) {
    borders.innerHTML = "";
    for (let i = 0; i < borderCode.length; i++) {
        const border = borderCode[i];

        let [country] = await getCountryCodeData(border);
        let html = generateCountryCard(country);
        borders.insertAdjacentHTML("beforeend", html);
    }
}

function generateCountryCard(country) {
    return `<div class="card m-3" style="width: 18rem;">
            <img src=${country.flags.png} class="card-img-top" alt=${country.name["official"]}>
            <div class="card-body">
                <h5 class="card-title">${country.name["official"]}</h5>
                <p class="card-text">🌍 ${country.region} </p>
                <p class="card-text">🏛️ ${country.capital} </p>
                <p class="card-text">🧑‍🤝‍🧑 ${country.population} </p>
                <a href="https://en.wikipedia.org/wiki/${country.name.common}" class="btn btn-primary">Visit ${country.name.common} </a>
            </div>
        </div>`;
}