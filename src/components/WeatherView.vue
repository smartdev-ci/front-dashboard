<template>
  <div class="main">
    <div class="weather-widget">
      <a href="https://www.weatherapi.com/" title="Free Weather API"
        ><img
          src="//cdn.weatherapi.com/v4/images/weatherapi_logo.png"
          alt="Weather data by WeatherAPI.com"
          border="0"
      /></a>
      <form @submit.prevent="fetchWeather" class="weather-form">
        <label for="city">Saisir une ville:</label>
        <input
          v-model="city"
          type="text"
          id="city"
          placeholder="City name"
          required
        />
        <button type="submit">Voir les details météo</button>
      </form>

      <div v-if="weather" class="weather-info">
        <!-- <img src="{{ weather. }}" alt=""> -->
        <h2>La météo à {{ weather.location.name }}</h2>
        <p>
          <strong> Pays: {{ weather.location.country }} </strong>
        </p>
        <p><strong>Temperature:</strong> {{ weather.current.temp_c }} °C</p>
        <p><strong>Temps:</strong> {{ weather.current.condition.text }}</p>
        <p><strong>Humidité:</strong> {{ weather.current.humidity }}%</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WeatherView",

  data() {
    return {
      city: "",
      weather: null,
    };
  },

  methods: {
    async fetchWeather() {
      try {
        const apiKey = "a96366506f984f04a2d100709243107";
        const response = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${this.city}&aqi=no`
        );
        if (!response.ok) {
          throw new Error("Weather data not found");
        }
        const data = await response.json();
        this.weather = data;
        console.log(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        this.weather = null;
      }
    },
  },
};
</script>
<style scoped>
.main {
  margin: 2%;
}
.weather-widget {
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 16px;
  max-width: 300px;
  background-color: #f9f9f9;
}

.weather-form {
  display: flex;
  flex-direction: column;
}

.weather-form label {
  font-weight: bold;
  margin-bottom: 8px;
}

.weather-form input {
  padding: 8px;
  margin-bottom: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.weather-form button {
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
}

.weather-form button:hover {
  background-color: #0056b3;
}

.weather-info {
  margin-top: 16px;
}

.weather-info h2 {
  font-size: 18px;
  margin-bottom: 8px;
}

.weather-info p {
  margin: 4px 0;
}
</style>
