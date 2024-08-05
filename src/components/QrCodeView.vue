<template>
  <div class="main">
    <div class="weather-widget">
      <a href="https://www.weatherapi.com/" title="Free Weather API"
        ><img
          src="https://static.wixstatic.com/media/983d8e_4b3f6bb2655a4a60ad19fc59a462e005~mv2.png/v1/fill/w_420,h_522,al_c,lg_1,q_85,enc_auto/983d8e_4b3f6bb2655a4a60ad19fc59a462e005~mv2.png"
          alt="GOQR API Logo"
          border="0"
          class="logo"
      /></a>
      <h1 class="widget-title">Générateur de QR Code</h1>
      <div class="input-container">
        <label for="qr-text">Texte :</label>
        <input
          v-model="text"
          @input="generateQRCode"
          placeholder="Saisir le texte pour le QR code"
        />
      </div>
      <div v-if="loading" class="loading">Génération du QR Code...</div>
      <div v-if="error" class="error">Erreur: {{ error }}</div>
      <div v-if="qrCodeUrl" class="qr-code-container">
        <img
          :src="qrCodeUrl"
          alt="QR Code"
          ref="qrCodeImage"
          @load="onImageLoad"
        />
        <button
          v-if="qrCodeUrl"
          @click="downloadQRCode"
          class="download-button"
        >
          Télécharger QR Code
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "QRCodeWidget",
  data() {
    return {
      text: "",
      qrCodeUrl: null,
      loading: false,
      error: null,
    };
  },
  methods: {
    async generateQRCode() {
      if (!this.text) {
        this.qrCodeUrl = null;
        return;
      }

      this.loading = true;
      this.error = null;

      try {
        const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
          this.text
        )}`;

        // Télécharger l'image en tant que Blob
        const response = await fetch(qrApiUrl);
        if (!response.ok) throw new Error("Échec du téléchargement du QR Code");

        const blob = await response.blob();
        this.qrCodeUrl = URL.createObjectURL(blob);
      } catch (error) {
        this.error = "Erreur lors de la génération du QR code.";
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    onImageLoad() {
      // L'image est complètement chargée
    },
    downloadQRCode() {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = this.$refs.qrCodeImage;

      // Assurer que l'image est chargée
      if (img.complete && img.naturalHeight !== 0) {
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;

        ctx.drawImage(img, 0, 0);

        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "qr-code.png";
        link.click();
      } else {
        console.error("L'image n'est pas encore chargée.");
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
#qr-code-widget {
  width: 300px;
  border-radius: 8px;
  overflow: hidden;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 15px;
  text-align: center;
}

.widget-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
}

.input-container {
  margin-bottom: 15px;
}

.input-container label {
  display: block;
  margin-bottom: 5px;
}

.input-container input {
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ddd;
}

.loading {
  font-size: 16px;
  color: #007bff;
}

.error {
  color: red;
  font-size: 14px;
}

.qr-code-container {
  margin-top: 15px;
}

.qr-code-container img {
  width: 200px;
  height: 200px;
  object-fit: cover;
}

.download-button {
  margin-top: 10px;
  padding: 8px;
  background-color: #007bff;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.download-button:hover {
  background-color: #0056b3;
}
</style>
