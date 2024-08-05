<template>
  <div class="main">
    <div class="card-widget">
      <a href="#" title="Free Weather API"
        ><img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQonMrfPFEjmiOTxP8TnH2F6F5XgiJeXoWRA&s"
          alt="Weather data by WeatherAPI.com"
          border="0"
          class="logo"
      /></a>
      <form @submit.prevent="fetchCardInfo" class="card-form">
        <label for="cardName">Saisir le nom de la carte:</label>
        <input
          v-model="card_name"
          type="text"
          id="cardName"
          placeholder="Nom de la carte"
          required
        />
        <button type="submit">Voir les détails de la carte</button>
      </form>

      <div v-if="loading" class="loading">Chargement...</div>
      <div v-if="error" class="error">{{ error }}</div>

      <div v-if="card" class="card-info">
        <h2>{{ card.name }}</h2>
        <img :src="card.card_images[0].image_url" :alt="card.name" />
        <p><strong>Type:</strong> {{ card.type }}</p>
        <p><strong>Description:</strong> {{ card.desc }}</p>
        <p><strong>ATK:</strong> {{ card.atk }}</p>
        <p><strong>DEF:</strong> {{ card.def }}</p>
        <p><strong>Level:</strong> {{ card.level }}</p>
        <p><strong>Race:</strong> {{ card.race }}</p>
        <p><strong>Attribute:</strong> {{ card.attribute }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "YugiView",

  data() {
    return {
      card_name: "",
      card: null,
      loading: false,
      error: null,
    };
  },

  methods: {
    async fetchCardInfo() {
      if (!this.card_name) {
        this.card = null;
        return;
      }

      this.loading = true;
      this.error = null;

      try {
        const response = await fetch(
          `https://db.ygoprodeck.com/api/v7/cardinfo.php?name=${this.card_name}`
        );
        if (!response.ok) {
          throw new Error("Cette carte n'existe pas dans notre base");
        }
        const data = await response.json();
        console.log(data);

        this.card = data.data[0];
        console.log(this.card);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des informations de la carte:",
          error
        );
        this.error = error.message;
        this.card = null;
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.main {
  margin: 2%;
}

.card-widget {
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 16px;
  max-width: 300px;
  background-color: #f9f9f9;
}

.card-form {
  display: flex;
  flex-direction: column;
}

.card-form label {
  font-weight: bold;
  margin-bottom: 8px;
}

.card-form input {
  padding: 8px;
  margin-bottom: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.card-form button {
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
}

.card-form button:hover {
  background-color: #0056b3;
}

.loading {
  margin-top: 16px;
  font-size: 16px;
}

.error {
  color: red;
  margin-top: 16px;
}

.card-info {
  margin-top: 16px;
}

.card-info h2 {
  font-size: 18px;
  margin-bottom: 8px;
}

.card-info p {
  margin: 4px 0;
}

.card-info img {
  max-width: 100px;
  height: auto;
}
</style>
