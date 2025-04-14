import { createApp } from "vue";
import "./style.css";
import router from "./router";
import App from "./App.vue";

const app = createApp(App); // Buat instance app
app.use(router); // Gunakan router
app.mount("#app"); // Mount ke #app
