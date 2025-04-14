<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

const goToHome = () => {
  router.push("/home");
};
</script>

<template>
  <div
    class="h-screen flex flex-col items-center justify-center text-center p-6 text-white animated-bg"
  >
    <p
      class="text-xl sm:text-2xl font-semibold leading-relaxed mb-2 drop-shadow"
    >
      عن أَبي أُمامَةَ رضي اللَّه عنهُ قال : سمِعتُ رسولَ اللَّهِ صَلّى اللهُ
      عَلَيْهِ وسَلَّم يقولُ : <br />
      « اقْرَؤُا القُرْآنَ فإِنَّهُ يَأْتي يَوْم القيامةِ شَفِيعاً لأصْحابِهِ »
    </p>
    <span class="text-sm mb-4 drop-shadow">رواه مسلم</span>

    <p class="text-base italic mb-8 drop-shadow">
      Dari Abu Amamah ra, aku mendengar Rasulullah saw. bersabda,<br />
      “Bacalah Al-Qur’an, karena sesungguhnya ia akan menjadi syafaat bagi para
      pembacanya di hari kiamat.”<br />
      (HR. Muslim)
    </p>

    <button
      @click="goToHome"
      class="px-8 py-3 bg-white text-green-800 font-semibold text-lg rounded-xl hover:bg-green-100 transition shadow-md"
    >
      Masuk
    </button>
  </div>
</template>

<style scoped>
.animated-bg {
  background: #14532d;
  background-image: radial-gradient(#bbf7d0 1px, transparent 1px);
  background-size: 20px 20px;
  animation: dotsMove 40s linear infinite;
}

@keyframes dotsMove {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 100px 100px;
  }
}
</style>
