const apiKey = '948ec2753c594c96b3e145708242705';

document.addEventListener('DOMContentLoaded', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            fetchWeatherByCoords(latitude, longitude);
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
});

async function fetchWeather() {
    const location = document.getElementById('locationInput').value;
    if (location) {
        await fetchWeatherByLocation(location);
    } else {
        alert("Please enter a location!");
    }
}

async function fetchWeatherByLocation(location) {
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (response.ok) {
            displayWeather(data);
        } else {
            alert('City not found. Please try again.');
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

async function fetchWeatherByCoords(lat, lon) {
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}&aqi=no`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (response.ok) {
            displayWeather(data);
        } else {
            alert('Location not found. Please try again.');
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function displayWeather(data) {
    if (data.error) {
        alert("Location not found!");
        return;
    }

    const cityName = document.getElementById('cityName');
    const date = document.getElementById('date');
    const temperature = document.getElementById('temperature');
    const description = document.getElementById('description');
    const humidity = document.getElementById('humidity');
    const windSpeed = document.getElementById('windSpeed');
    const weatherIcon = document.getElementById('weather-icon');

    cityName.textContent = `Weather in ${data.location.name}, ${data.location.region}, ${data.location.country}`;
    date.textContent = new Date().toLocaleString();
    temperature.innerHTML = `${data.current.temp_c}°C`;
    description.textContent = `Condition: ${data.current.condition.text}`;
    humidity.textContent = `Humidity: ${data.current.humidity}%`;
    windSpeed.textContent = `Wind Speed: ${data.current.wind_kph} kph`;
    weatherIcon.src = data.current.condition.icon;
    weatherIcon.alt = data.current.condition.text;

    document.getElementById('weather-info').style.display = 'block';
}
