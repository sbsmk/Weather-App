const cityInput = document.querySelector("#cityInput");
const searchBtn = document.querySelector("#searchBtn");
const cityName = document.querySelector("#cityName");
const weatherIcon = document.querySelector("#weatherIcon");
const temperature = document.querySelector("#temperature");
const weatherCondition = document.querySelector("#weatherCondition");
const humidity = document.querySelector("#humidity");
const windSpeed = document.querySelector("#windSpeed");

let currentTempCelsius = 0;
let isCelsius = true;

function setupEventListeners() {
  searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city === "") {
      alert("Please insert the city name!!!");
      return;
    }
    fetchWeather(city);
  });

  toggleTemp.addEventListener("click", toggleTemperature);
}

setupEventListeners();

const fetchWeather = async function fetchWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApi}&units=metric`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("City not found");
    }
    const data = await response.json();

    updateUI(data);
    console.log("Fetch Temp in Celsius", data.main.temp);
  } catch (error) {
    alert(error.message);
  }
};

const updateUI = async function updateUI(data) {
  document.getElementById("weatherDisplay").style.display = "block ";
  document.getElementById("toggleTemp").style.display = "block";

  document.getElementById(
    "cityName"
  ).textContent = `${data.name}, ${data.sys.country}`;

  currentTempCelsius = data.main.temp;
  console.log("Updated Celsius Temp:", currentTempCelsius);

  document.getElementById("tempValue").textContent =
    currentTempCelsius.toFixed(1);
  document.getElementById("tempUnit").textContent = "C";

  document.getElementById(
    "weatherCondition"
  ).textContent = `Condition: ${data.weather[0].description}`;
  document.getElementById(
    "humidity"
  ).textContent = `Humidity: ${data.main.humidity}`;
  document.getElementById(
    "windSpeed"
  ).textContent = `Wind Speed: ${data.wind.speed} km/h`;

  document.getElementById(
    "weatherIcon"
  ).src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  document.getElementById("weatherIcon").alt = data.weather[0].description;
  document.getElementById("weatherIcon").style.display = "block";

  reattachToggleListener();
};

function reattachToggleListener() {
  const toggleTemp = document.getElementById("toggleTemp");
  toggleTemp.removeEventListener("click", toggleTemperature);
  toggleTemp.addEventListener("click", toggleTemperature);
}

function toggleTemperature() {
  const tempUnitElement = document.getElementById("tempUnit");
  console.log("tempUnitElement inside click event:", tempUnitElement);

  if (isCelsius) {
    const tempFahrenheit = (currentTempCelsius * 9) / 5 + 32;
    tempValue.textContent = tempFahrenheit.toFixed(1);
    tempUnitElement.textContent = "F";
    toggleTemp.textContent = "Switch to C";
  } else {
    tempValue.textContent = currentTempCelsius.toFixed(1);
    tempUnitElement.textContent = "C";
    toggleTemp.textContent = "Switch to F";
  }

  isCelsius = !isCelsius;
  console.log(isCelsius);
}
