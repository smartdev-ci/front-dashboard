<template>
  <div class="main">
    <div class="weather-widget">
      <a href="https://www.weatherapi.com/" title="Free Weather API">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWTop95oa3L3azM_q5GPHaWDGDKZOE5mFnqQ&s"
          alt="Weather API"
          border="0"
          class="logo"
        />
      </a>
      <h6 class="widget-title">Dernières Nouvelles</h6>
      <form @submit.prevent="fetchNews" class="weather-form">
        <label for="city">Saisir votre thème</label>
        <input
          v-model="themes"
          type="text"
          id="city"
          placeholder="Thèmes"
          required
        />
        <button type="submit" class="refresh-button">
          Voir les détails des nouvelles
        </button>
      </form>
      <div id="news-container">
        <div v-if="loading" class="loading">Chargement...</div>
        <div v-if="error" class="error">Erreur: {{ error }}</div>
        <div v-for="article in articles" :key="article.url" class="news-item">
          <a :href="article.url" target="_blank" class="news-link">
            <img
              :src="article.urlToImage || 'https://via.placeholder.com/300x200'"
              alt="Image"
              class="news-image"
            />
            <div class="news-content">
              <h2 class="news-title">{{ article.title }}</h2>
              <p class="news-description">
                {{ article.description || "Pas de description" }}
              </p>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "NewsView",
  data() {
    return {
      articles: [],
      loading: false,
      error: null,
      themes: "",
      menuVisible: false, // Pour contrôler la visibilité du menu
    };
  },
  methods: {
    async fetchNews() {
      this.loading = true;
      this.error = null;
      const apiKey = "175b3b61165149fdb67fd11bcf5655b5";
      try {
        const response = await axios.get(
          `https://newsapi.org/v2/everything?q=${this.themes}&from=2024-07-01&sortBy=publishedAt&apiKey=${apiKey}`,
          {
            params: {
              pageSize: 5,
              page: 1,
            },
          }
        );
        this.articles = response.data.articles;
      } catch (err) {
        this.error = "Impossible de charger les nouvelles.";
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
    toggleMenu() {
      this.menuVisible = !this.menuVisible;
    },
    handleMenuClick(option) {
      console.log(`Menu option clicked: ${option}`);
      // Handle menu options here
      this.menuVisible = false; // Hide menu after clicking
    },
  },
};
</script>

<style scoped>
.main {
  margin: 2%;
}

.weather-widget {
  position: relative; /* Pour le positionnement du menu */
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 16px;
  max-width: 300px;
  background-color: #f9f9f9;
}

.menu-container {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1000;
}

.menu-button {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
}

.menu {
  position: absolute;
  top: 30px;
  right: 0;
  background: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.menu button {
  display: block;
  padding: 10px;
  width: 100%;
  text-align: left;
  border: none;
  background: none;
  cursor: pointer;
}

.menu button:hover {
  background: #f0f0f0;
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

.news-item {
  display: flex;
  margin-bottom: 15px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
}

.news-item:last-child {
  border-bottom: none;
}

.news-link {
  text-decoration: none;
  color: #333;
  display: flex;
}

.news-image {
  width: 100px;
  height: 75px;
  object-fit: cover;
  border-radius: 4px;
  margin-right: 10px;
}

.news-content {
  flex: 1;
}

.news-title {
  font-size: 16px;
  font-weight: bold;
  margin: 0;
}

.news-description {
  font-size: 14px;
  color: #666;
}

.refresh-button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #ffffff;
  border: none;
  border-top: 1px solid #ddd;
  cursor: pointer;
  font-size: 16px;
}

.refresh-button:hover {
  background-color: #0056b3;
}

.loading {
  text-align: center;
  font-size: 16px;
  color: #007bff;
}

.error {
  color: red;
  text-align: center;
  font-size: 14px;
}
</style>
