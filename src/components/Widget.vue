<template>
  <div class="active-widgets">
    <h2>Widgets Activés</h2>
    <div class="button">
      <a @click="goToDaschboard()" class="btn">
        Voir les widgets disponibles
      </a>
    </div>
    <div class="widgets">
      <div v-for="(widget, index) in activeWidgets" :key="index">
        <component :is="widget.component" />
        <button @click="deactivateWidget(widget.id)">Désactiver</button>
      </div>
    </div>
  </div>
</template>

<script>
import WeatherView from "@/components/WeatherView.vue";
import NewsView from "@/components/NewsView.vue";
import QRCodeWidget from "@/components/QrCodeView.vue";
import CalculatriceView from "@/components/CalulatriceView.vue";
import YugiView from "@/components/YugiView.vue";

export default {
  name: "ActiveWidgetsView",
  components: {
    WeatherView,
    NewsView,
    QRCodeWidget,
    CalculatriceView,
    YugiView,
  },
  data() {
    return {
      activeWidgets: [],
      // userId: "123456", // Remplacez par l'ID de l'utilisateur connecté
    };
  },
  methods: {
    async fetchActiveWidgets() {
      const userId = localStorage.getItem("token");
      try {
        const response = await fetch(
          `http://localhost:3000/widget/active/${userId}/`
        );

        const text = await response.text();
        console.log("Raw response from API:", text);

        const activeWidgets = JSON.parse(text);
        console.log("Parsed response from API:", activeWidgets);

        if (Array.isArray(activeWidgets)) {
          const widgetsMap = {
            "66ae113d4cd10afd6df8e61d": WeatherView,
            "66ae14785fffabf0648035cf": NewsView,
            "66ae1a79e6f017307b695c13": QRCodeWidget,
            "66ae1a8fe6f017307b695c15": CalculatriceView,
            "66ae28b3e6f017307b695c2b": YugiView,
          };

          activeWidgets.forEach((widget) => {
            if (
              !this.activeWidgets.some(
                (w) => w.component === widgetsMap[widget.widgetId]
              )
            ) {
              this.activeWidgets.push({
                id: widget.widgetId,
                component: widgetsMap[widget.widgetId],
              });
            }
          });
        } else {
          console.error("API response is not an array:", activeWidgets);
        }
      } catch (error) {
        console.error("Error fetching active widgets:", error);
      }
    },
    async deactivateWidget(widgetId) {
      const userId = localStorage.getItem("token");
      try {
        await fetch(`http://localhost:3000/widget/deactivate`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userId,
            widgetId: widgetId,
          }),
        });
        // Refresh the widget list after deactivation
        this.activeWidgets = this.activeWidgets.filter(
          (widget) => widget.id !== widgetId
        );
      } catch (error) {
        console.error("Error deactivating widget:", error);
      }
    },
    goToDaschboard() {
      this.$router.push("/dashboard");
    },
  },
  async created() {
    await this.fetchActiveWidgets();
  },
};
</script>

<style scoped>
.widgets {
  display: grid;
  grid-template-columns: auto auto auto;
  padding: 10px;
}
.btn {
  cursor: pointer;
}
</style>
