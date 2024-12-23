<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      selectedMobiles: [] as string[],
    };
  },
  mounted() {
    const query = this.$route.query.mobiles;
    if (query) {
      this.selectedMobiles = JSON.parse(query as string);
    } else {
      alert('ไม่มีข้อมูลสำหรับเปรียบเทียบ');
    }
  },
});
</script>

<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-900">
    <div class="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-4xl">
    <h1 class="text-center text-2xl font-bold mb-6">การเปรียบเทียบ</h1>
    <div class="grid grid-cols-3 gap-4">
      <!-- มือถือ 01 -->
      <div class="grid grid-rows-3 gap-2 text-center border p-4 bg-gray-700 p-4 rounded-lg text-white border-4 border-white-600 shadow-xl">
        <div>มือถือ01</div>
        <div>คะแนน</div>
        <button class="bg-blue-500 text-white px-4 py-2 rounded">ดูรายละเอียดเพิ่มเติม</button>
      </div>
      <!-- มือถือ 02 -->
      <div class="grid grid-rows-3 gap-2 text-center border p-4 bg-gray-700 p-4 rounded-lg text-white border-4 border-white-600 shadow-xl">
        <div>มือถือ02</div>
        <div>คะแนน</div>
        <button class="bg-blue-500 text-white px-4 py-2 rounded">ดูรายละเอียดเพิ่มเติม</button>
      </div>
      <!-- มือถือ 03 -->
      <div class="grid grid-rows-3 gap-2 text-center border p-4 bg-gray-700 p-4 rounded-lg text-white border-4 border-white-600 shadow-xl">
        <div>มือถือ03</div>
        <div>คะแนน</div>
        <button class="bg-blue-500 text-white px-4 py-2 rounded">ดูรายละเอียดเพิ่มเติม</button>
      </div>
    </div>
    <h1 class="text-center text-2xl font-bold mb-6 mt-8">มือถือที่เราแนะนำให้คุณ</h1>
    <div class="grid grid-cols-2 gap-4 mt-4">
      <!-- รูปภาพมือถือแนะนำ -->
      <div class="text-center border p-4">รูป01</div>
      <!-- รายละเอียดมือถือแนะนำ -->
      <div class="grid grid-rows-3 gap-2 text-center border p-4">
        <div>มือถือ01</div>
        <div>คะแนน</div>
        <button class="bg-green-500 text-white px-4 py-2 rounded">ดูรายละเอียดเพิ่มเติม</button>
      </div>
    </div>
  </div>
  </div>
</template>

<style>
.bg-gray-900 {
  background-color: #111827;
}

.bg-gray-800 {
  background-color: #1f2937;
}

.text-white {
  color: #ffffff;
}

button:hover {
  background-color: #2563eb;
}

/* Style for the box containing selected logos with clear visibility */
.bg-gray-700 {
  background-color: #374151;
}

.bg-blue-600 {
  background-color: #2563eb;
}

.bg-blue-600:hover {
  background-color: #3b82f6;
}

/* Additional styling for clear box visibility */
.border-4 {
  border-width: 4px;
}

.border-blue-600 {
  border-color: #2563eb;
}

.shadow-xl {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
}
</style>
