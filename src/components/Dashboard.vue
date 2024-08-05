<template>
  <div class="main">
    <div class="data">
      <a @click="goToWidget()" class="logo"></a>
    </div>
    <div class="widgets">
      <div
        v-for="(widget, index) in widgets"
        :key="index"
        class="widget-container"
      >
        <component :is="getComponent(widget.widgetId)" />
        <button
          v-if="!widget.activated"
          @click="activateWidget(widget.widgetId)"
        >
          Activer
        </button>
        <span v-else>Activé</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import WeatherView from "@/components/WeatherView.vue";
import NewsView from "@/components/NewsView.vue";
import QRCodeWidget from "@/components/QrCodeView.vue";
import CalculatriceView from "@/components/CalulatriceView.vue";
import YugiView from "@/components/YugiView.vue";

export default {
  name: "WidgetList",
  components: {
    WeatherView,
    NewsView,
    QRCodeWidget,
    CalculatriceView,
    YugiView,
  },
  data() {
    return {
      userId: localStorage.getItem("token"), // Assurez-vous que le token est bien stocké
      widgets: [],
    };
  },
  methods: {
    goToWidget() {
      this.$router.push("/widget");
    },
    async fetchInactiveWidgets() {
      try {
        const response = await axios.get(
          `http://localhost:3000/widget/inactive/${this.userId}`
        );
        this.widgets = response.data;
      } catch (error) {
        console.error("Error fetching inactive widgets:", error);
      }
    },
    async activateWidget(widgetId) {
      try {
        await axios.post(`http://localhost:3000/widget/activate`, {
          userId: this.userId,
          widgetId: widgetId,
        });
        this.fetchInactiveWidgets(); // Refresh the widget list after activation
      } catch (error) {
        console.error("Error activating widget:", error);
      }
    },
    getComponent(widgetId) {
      const componentMap = {
        "66ae113d4cd10afd6df8e61d": WeatherView,
        "66ae14785fffabf0648035cf": NewsView,
        "66ae1a79e6f017307b695c13": QRCodeWidget,
        "66ae1a8fe6f017307b695c15": CalculatriceView,
        "66ae28b3e6f017307b695c2b": YugiView,
        // Ajoutez d'autres composants ici si nécessaire
      };
      return componentMap[widgetId] || null;
    },
  },
  created() {
    this.fetchInactiveWidgets();
  },
};
</script>

<style scoped>
.widgets {
  display: grid;
  grid-template-columns: auto auto auto;
  padding: 10px;
}
.widget-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
