<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const datasurah = ref([]);
const loading = ref(true);
const router = useRouter();

const fetchdatasurah = async () => {
  try {
    const response = await fetch(
      "https://api.quran.com/api/v4/chapters?language=id"
    );
    const data = await response.json();
    datasurah.value = data.chapters;
  } catch (error) {
    console.error("Error fetching surah data:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchdatasurah);

const goToHome = () => {
  router.push("/home");
};
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-green-700 to-green-200 text-green-900 p-6"
  >
    <!-- Tombol kembali -->
    <div class="mb-6">
      <button
        @click="goToHome"
        class="px-6 py-2 bg-white text-green-800 border border-green-700 rounded-xl font-semibold hover:bg-green-100 transition"
      >
        ← Kembali ke Beranda
      </button>
    </div>

    <!-- Judul -->
    <h1 class="text-3xl font-bold text-center mb-8">Daftar Surah</h1>

    <!-- Loading -->
    <div v-if="loading" class="text-center text-gray-100">Memuat data...</div>

    <!-- Daftar surah -->
    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    >
      <router-link
        v-for="surah in datasurah"
        :key="surah.id"
        :to="`/surah/${surah.id}/info`"
        class="block bg-white/80 backdrop-blur-sm shadow-md rounded-xl p-4 hover:shadow-lg transition text-green-900"
      >
        <h2 class="text-lg font-semibold">{{ surah.name_simple }}</h2>
        <p class="text-sm text-black">{{ surah.translated_name.name }}</p>
        <p class="text-xs text-black">{{ surah.verses_count }} Ayat</p>
        <div class="text-right text-xl font-arabic mt-2">
          {{ surah.name_arabic }}
        </div>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.font-arabic {
  font-family: "Scheherazade New", serif;
}
</style>
