import { createRouter, createWebHistory } from "vue-router";
import Home from "@/components/home.vue";
import surahlist from "@/components/surahlist.vue";
import pembuka from "@/pembuka.vue";
import surahinfo from "@/components/surahinfo.vue";
import ayat from "@/components/ayatTerjemah.vue";

const routes = [
  { path: "/", component: pembuka },
  { path: "/home", component: Home },
  { path: "/surah", component: surahlist },
  { path: "/surah/:id/info", component: surahinfo },
  { path: "/surah/:id/verses", component: ayat },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
