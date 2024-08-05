<template>
  <div class="home">
    <h2>Home</h2>
    <div v-if="user">
      <p>Welcome, {{ user.display_name }}</p>
      <img :src="user.images[0]?.url" :alt="user.display_name" />
    </div>
    <div v-else>
      <p>
        Please
        <router-link to="/spotify-login">login with Spotify</router-link>.
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      user: null,
    };
  },
  async created() {
    const accessToken = localStorage.getItem("spotify_access_token");
    console.log("Stored Access Token:", accessToken);
    if (accessToken) {
      try {
        const response = await axios.get("http://localhost:3000/spotify/me", {
          params: { access_token: accessToken },
        });
        console.log("User Data:", response.data);
        this.user = response.data;
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  },
};
</script>

<style scoped>
.home {
  text-align: center;
  margin-top: 50px;
}

.home img {
  border-radius: 50%;
  width: 100px;
  height: 100px;
}
</style>
