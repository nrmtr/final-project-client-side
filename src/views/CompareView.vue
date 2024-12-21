<script lang="ts">
export default {
  // Your component code
}
</script>

<template>
  <div class="flex justify-center items-center min-h-screen bg-black-100">
    <div class="bg-black p-6 rounded shadow-lg w-full max-w-4xl">
    <h1 class="text-center text-2xl font-bold mb-6">การเปรียบเทียบ</h1>
    <div class="grid grid-cols-3 gap-4">
      <!-- มือถือ 01 -->
      <div class="grid grid-rows-3 gap-2 text-center border p-4">
        <div>มือถือ01</div>
        <div>คะแนน</div>
        <button class="bg-blue-500 text-white px-4 py-2 rounded">ดูรายละเอียดเพิ่มเติม</button>
      </div>
      <!-- มือถือ 02 -->
      <div class="grid grid-rows-3 gap-2 text-center border p-4">
        <div>มือถือ02</div>
        <div>คะแนน</div>
        <button class="bg-blue-500 text-white px-4 py-2 rounded">ดูรายละเอียดเพิ่มเติม</button>
      </div>
      <!-- มือถือ 03 -->
      <div class="grid grid-rows-3 gap-2 text-center border p-4">
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
/* Custom styles can be added here */
</style>
