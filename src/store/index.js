import { createStore } from "vuex";

export default createStore({
  state: {
    users: [],
  },
  getters: {},
  mutations: {
    // USERS ADD
    SETS_USER(state, users) {
      state.users = users;
    },

    ADD_USER(state, user) {
      state.users.push(user);
    },
  },
  actions: {
    async fetchUsers({ commit }) {
      const response = await fetch("https://dashboard-fefr.onrender.com/users/");
      const data = await response.json();
      console.log(data);
      commit("SETS_USER", data);
    },

    async createUser({ commit }, { userData }) {
      try {
        const response = await fetch("https://dashboard-fefr.onrender.com/users/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });
        if (!response.ok) {
          const errorData = await response.json();
          console.log(errorData.message);
          throw new Error(errorData.message || "Something went wrong");
          // throw new Error("Erreur de creation " + response.statusText);
        }
        const new_user = await response.json();
        commit("ADD_USER", new_user);
      } catch (error) {
        console.error("Error creating users:", error);
        throw error;
      }
    },
  },
  modules: {},
});
