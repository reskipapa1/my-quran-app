<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const chapterId = route.params.id;

const verses = ref([]);
const loading = ref(true);

const fetchVerses = async () => {
  try {
    const res = await fetch(
      `https://api.quran.com/api/v4/verses/by_chapter/${chapterId}?language=id&words=false&translations=33&fields=text_uthmani&limit=300`
    );
    const data = await res.json();
    verses.value = data.verses;
  } catch (err) {
    console.error("Gagal memuat ayat:", err);
  } finally {
    loading.value = false;
  }
};

const goBack = () => {
  router.back();
};

onMounted(fetchVerses);
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-green-700 to-green-200 p-6">
    <!-- Tombol Kembali -->
    <div class="mb-6">
      <button
        @click="goBack"
        class="px-6 py-2 bg-white text-green-800 border border-green-700 rounded-xl font-semibold hover:bg-green-100 transition"
      >
        ← Kembali
      </button>
    </div>

    <!-- Judul -->
    <h1 class="text-3xl font-bold text-green-800 text-center mb-8">
      Ayat-ayat Surah
    </h1>

    <!-- Loader -->
    <div v-if="loading" class="text-center text-white">Memuat ayat-ayat...</div>

    <!-- Daftar Ayat -->
    <div v-else class="space-y-6">
      <div
        v-for="verse in verses"
        :key="verse.id"
        class="bg-white/80 rounded-xl shadow-md p-4"
      >
        <!-- Teks Arab + Nomor -->
        <p class="text-2xl text-right font-arabic text-green-800 mb-3">
          {{ verse.text_uthmani }}
          <span class="text-base text-black ml-2"
            >({{ verse.verse_number }})</span
          >
        </p>

        <!-- Terjemahan -->
        <p class="text-black italic text-left">
          {{ verse.translations?.[0]?.text.replace(/<sup.*?<\/sup>/g, "") }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.font-arabic {
  font-family: "Amiri", serif;
  direction: rtl;
  line-height: 2.2rem;
}
</style>
