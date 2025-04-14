<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const searchQuery = ref("");
const results = ref([]);
const loading = ref(false);

const goToSurah = () => {
  router.push("/surah");
};

const goToVerse = (verseKey) => {
  const [surahId] = verseKey.split(":");
  router.push(`/surah/${surahId}/verses`);
};

const searchQuran = async () => {
  if (!searchQuery.value) return;
  loading.value = true;
  try {
    const res = await fetch(
      `https://api.quran.com/api/v4/search?q=${encodeURIComponent(
        searchQuery.value
      )}&language=id`
    );
    const data = await res.json();
    results.value = Array.isArray(data.search?.results)
      ? data.search.results
      : [];
  } catch (err) {
    console.error("Gagal mencari:", err);
    results.value = [];
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div
    class="relative min-h-screen bg-cover bg-center"
    style="background-image: url('/src/assets/quran.jpg')"
  >
    <div class="min-h-screen p-6 flex flex-col items-center text-green-900">
      <!-- Konten utama -->
      <div
        class="bg-white/90 p-8 rounded-2xl shadow-lg max-w-2xl text-center text-green-900"
      >
        <h1 class="text-3xl font-bold mb-4">Selamat Datang di My Quran App</h1>
        <p class="text-lg">
          Silakan cari ayat atau buka daftar surah di bawah ini.
        </p>
      </div>

      <!-- Tombol Navigasi -->
      <div class="mt-20">
        <button
          @click="goToSurah"
          class="px-6 py-3 bg-white text-green-800 border border-green-700 rounded-xl text-lg font-semibold hover:bg-green-100 transition"
        >
          Daftar Surah
        </button>
      </div>

      <!-- Search Bar -->
      <div class="w-full max-w-3xl mt-40 pb-6">
        <div class="flex items-center gap-4 bg-white/95 p-4 rounded-xl shadow">
          <input
            v-model="searchQuery"
            @keyup.enter="searchQuran"
            type="text"
            placeholder="Cari kata atau ayat dalam Quran..."
            class="flex-grow px-4 py-2 rounded-lg border focus:outline-none text-green-900"
          />
          <button
            @click="searchQuran"
            class="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition"
          >
            Cari
          </button>
        </div>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="mt-6 text-white text-lg">Mencari...</div>

      <!-- Hasil Pencarian -->
      <div
        v-if="results && results.length"
        class="mt-6 max-w-2xl w-full space-y-6"
      >
        <div
          v-for="result in results"
          :key="result.verse_key"
          @click="goToVerse(result.verse_key)"
          class="bg-white/90 p-4 rounded-xl shadow cursor-pointer hover:bg-green-100 transition"
        >
          <p class="text-sm text-gray-600">{{ result.verse_key }}</p>
          <p class="text-right font-arabic text-2xl">{{ result.text }}</p>
          <p class="italic mt-2 text-green-900">
            {{ result.translation_text }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.font-arabic {
  font-family: "Amiri", serif;
  direction: rtl;
}
</style>
