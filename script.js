function fetchWeather() {
    const apiKey = "948ec2753c594c96b3e145708242705";
    const location = document.getElementById("location").value;
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          alert(data.error.message);
        } else {
          displayWeather(data);
        }
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
        alert('Error fetching weather data. Please try again.');
      });
  }
  
  function displayWeather(data) {
    const { location, current } = data;
    const { name, region, country } = location;
    const { temp_c, condition, humidity, wind_kph } = current;
    const { text, icon } = condition;
  
    document.getElementById("cityName").textContent = `${name}, ${region}, ${country}`;
    document.getElementById("description").textContent = text;
    document.getElementById("temperature").textContent = `Temperature: ${temp_c}°C`;
    document.getElementById("humidity").textContent = `Humidity: ${humidity}%`;
    document.getElementById("windSpeed").textContent = `Wind Speed: ${wind_kph} km/h`;
  
    const weatherIcon = document.createElement("img");
    weatherIcon.src = `https:${icon}`;
    weatherIcon.alt = text;
    document.getElementById("description").appendChild(weatherIcon);
  }
