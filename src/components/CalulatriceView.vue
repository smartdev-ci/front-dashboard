<template>
  <div class="calculator">
    <div class="display">{{ display }}</div>
    <div class="buttons">
      <button
        v-for="button in buttons"
        :key="button"
        @click="onButtonClick(button)"
      >
        {{ button }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "CalculatriceView",
  data() {
    return {
      display: "",
      buttons: [
        "7",
        "8",
        "9",
        "/",
        "4",
        "5",
        "6",
        "*",
        "1",
        "2",
        "3",
        "-",
        "0",
        ".",
        "=",
        "+",
        "C",
      ],
    };
  },
  methods: {
    onButtonClick(button) {
      if (button === "C") {
        this.display = "";
      } else if (button === "=") {
        this.calculateResult();
      } else {
        this.display += button;
      }
    },
    calculateResult() {
      try {
        this.display = eval(this.display);
      } catch (error) {
        this.display = "Error";
      }
    },
  },
};
</script>

<style scoped>
.calculator {
  width: 235px;
  margin: auto;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.display {
  width: 100%;
  height: 40px;
  background: #222;
  color: #fff;
  text-align: right;
  padding: 10px;
  box-sizing: border-box;
  font-size: 18px;
  margin-bottom: 10px;
  border-radius: 5px;
}

.buttons {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

button {
  width: 100%;
  padding: 15px;
  font-size: 18px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background: #f0f0f0;
  transition: background 0.3s;
}

button:hover {
  background: #ddd;
}

button:active {
  background: #ccc;
}
</style>
