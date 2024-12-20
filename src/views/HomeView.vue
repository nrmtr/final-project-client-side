<script lang="ts">
// import PriceRange from '../components/PriceRange.vue'

export default {
  // components: {
    // PriceRange,
  // },
  data() {
    return {
      // List of logos with their source paths and names
      logos: [
        { name: 'Samsung', src: '../assets/img/logo_samsung.png' },
        { name: 'Vivo', src: '../assets/img/logo_vivo.png' },
        { name: 'Xiaomi', src: '../assets/img/logo_xiaomi.png' },
      ],
      selectedCategory: '',selectedPrice: { min: '', max: '' },
      // Array to store the selected logos
      selectedLogos: [],
    }
  },
}
</script>
<template>
  <div class="">
    <h1 class="text-center">เลือกหัวข้อที่ต้องการ</h1>
    <div>
      <h3 class="text-center">แบรนด์</h3>
    </div>
    <div class="grid grid-cols-3 gap-1">
      <div v-for="(logo, index) in logos" :key="index">
        <input type="checkbox" v-model="selectedLogos" :value="logo.name" />
        <img :src="logo.src" :alt="logo.name" width="100" height="100" />
      </div>
    </div>
    <h3 class="text-center">ประเภทการใช้งาน</h3>
    <div class="grid grid-cols-3 gap-2">
      <label>
        <input type="radio" name="category" value="general" v-model="selectedCategory" class="hidden">
        <span class="block text-center p-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer">ใช้งานทั่วไป</span>
      </label>
  
      <label>
        <input type="radio" name="category" value="gaming" v-model="selectedCategory" class="hidden">
        <span class="block text-center p-2 bg-green-500 text-white rounded hover:bg-green-600 cursor-pointer">เล่นเกม</span>
      </label>
  
      <label>
        <input type="radio" name="category" value="photography" v-model="selectedCategory" class="hidden">
        <span class="block text-center p-2 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer">ถ่ายรูปสวย</span>
      </label>
  
      <label>
        <input type="radio" name="category" value="rider" v-model="selectedCategory" class="hidden">
        <span class="block text-center p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 cursor-pointer">สำหรับไรเดอร์</span>
      </label>
  
      <label>
        <input type="radio" name="category" value="ai" v-model="selectedCategory" class="hidden">
        <span class="block text-center p-2 bg-purple-500 text-white rounded hover:bg-purple-600 cursor-pointer">AI Feature</span>
      </label>
  
      <label>
        <input type="radio" name="category" value="video" v-model="selectedCategory" class="hidden">
        <span class="block text-center p-2 bg-pink-500 text-white rounded hover:bg-pink-600 cursor-pointer">วิดีโอ ไลฟ์สด</span>
      </label>
    </div>
    <div class="mt-4">
      <p>
        คุณเลือก: <strong>{{ selectedCategory }}</strong>
      </p>
    </div>
    <h3 class="text-center">ระดับราคา</h3>
    <div class="grid grid-cols-3 gap-2">
  <label>
    <input type="radio" name="Price" v-model="selectedPrice" :value="{ min: 0, max: 5000 }" class="hidden">
    <span class="block text-center p-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer">ระดับเริ่มต้น 0 - 5,000</span>
  </label>

  <label>
    <input type="radio" name="Price" v-model="selectedPrice" :value="{ min: 8000, max: 15000 }" class="hidden">
    <span class="block text-center p-2 bg-green-500 text-white rounded hover:bg-green-600 cursor-pointer">ระดับกลาง 8,000 - 15,000</span>
  </label>

  <label>
    <input type="radio" name="Price" v-model="selectedPrice" :value="{ min: 25000, max: 1000000 }" class="hidden">
    <span class="block text-center p-2 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer">ระดับพรีเมี่ยม 25,000 +++</span>
  </label>
</div>

<div class="mt-4">
  <p>
    คุณเลือก: <strong>{{ selectedPrice.min }} - {{ selectedPrice.max }}</strong>
  </p>
</div>

    <!-- <div> -->
      <!-- <PriceRange /> -->
    <!-- </div> -->
    <h3 class="text-center">ผลลัพธ์การแนะนำ</h3>
    <h3 class="text-center">เลือก 3 รุ่น เพื่อเปรียบเทียบ</h3>
    <div class="grid grid-cols-6 gap-2">
      <div>มือถือ01</div>
      <div>มือถือ02</div>
      <div>มือถือ03</div>
    </div>
    <button>เปรียบเทียบ</button>
  </div>
</template>
<style>
</style>