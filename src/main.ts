import { createApp } from "vue";
import App from "./App.vue";
import { Quasar } from "quasar";
import "@quasar/extras/material-icons/material-icons.css";
import "quasar/src/css/index.sass";
import { createPinia } from "pinia";
import router from "@/router";

const pinia = createPinia();

createApp(App)
  .use(Quasar, {
    plugins: {},
  })
  .use(router)
  .use(pinia)
  .mount("#app");
