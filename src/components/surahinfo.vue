<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const chapterId = route.params.id;

const chapter = ref(null);
const chapterInfo = ref(null);
const loading = ref(true);

const fetchChapterData = async () => {
  try {
    const res1 = await fetch(
      `https://api.quran.com/api/v4/chapters/${chapterId}`
    );
    const data1 = await res1.json();
    chapter.value = data1.chapter;

    const res2 = await fetch(
      `https://api.quran.com/api/v4/chapters/${chapterId}/info?language=id`
    );
    const data2 = await res2.json();
    chapterInfo.value = data2.chapter_info;
  } catch (err) {
    console.error("Error fetching chapter info:", err);
  } finally {
    loading.value = false;
  }
};

const goToSurahList = () => {
  router.push("/surah");
};

const goToVerses = () => {
  router.push(`/surah/${chapterId}/verses`);
};

onMounted(fetchChapterData);
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-green-700 to-green-200 text-green-900 p-6"
  >
    <div class="flex justify-between items-center mb-6">
      <button
        @click="goToSurahList"
        class="px-6 py-2 bg-white text-green-800 border border-green-700 rounded-xl font-semibold hover:bg-green-100 transition"
      >
        ← Daftar Surah
      </button>
      <button
        @click="goToVerses"
        class="px-6 py-2 bg-green-900 text-white rounded-xl font-semibold hover:bg-green-800 transition"
        v-if="!loading && chapter"
      >
        Baca Ayat
      </button>
    </div>

    <div v-if="loading" class="text-center text-white">
      Memuat informasi surah...
    </div>

    <div
      v-else-if="chapter && chapterInfo"
      class="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg max-w-3xl mx-auto"
    >
      <h1 class="text-3xl font-bold text-center mb-2">
        {{ chapter.name_arabic }} ({{ chapter.name_simple }})
      </h1>
      <p class="text-center text-green-800 italic mb-4">
        {{ chapter.translated_name.name }} –
        <span class="text-sm">{{ chapterInfo.source }}</span>
      </p>
      <div
        class="prose max-w-none text-justify text-black"
        v-html="chapterInfo.text"
      ></div>
    </div>

    <div v-else class="text-center text-red-500">
      Gagal memuat informasi surah.
    </div>
  </div>
</template>

<style scoped>
.prose :deep(p) {
  margin-bottom: 1em;
}
</style>
