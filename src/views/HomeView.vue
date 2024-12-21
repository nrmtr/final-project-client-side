<template>
  <div class="flex justify-center items-center min-h-screen bg-black-100">
    <div class="bg-black p-6 rounded shadow-lg w-full max-w-4xl">
      <h1 class="text-center text-2xl font-bold mb-6">เลือกหัวข้อที่ต้องการ</h1>

      <!-- แบรนด์ -->
      <fieldset class="mb-6">
        <legend class="text-lg font-semibold mb-2 text-center">แบรนด์</legend>
        <div class="grid grid-cols-3 gap-4 place-items-center">
          <label v-for="(logo, index) in logos" :key="index" class="cursor-pointer">
            <input type="checkbox" v-model="selectedLogos" :value="logo.name" class="hidden" />
            <img
              :src="logo.src"
              :alt="logo.name"
              class="w-24 h-24 object-contain hover:opacity-75"
            />
          </label>
        </div>
        <p class="mt-4 text-center">คุณเลือกแบรนด์: {{ selectedLogos.join(', ') }}</p>
      </fieldset>

      <!-- ประเภทการใช้งาน -->
      <fieldset class="mb-6">
        <legend class="text-lg font-semibold mb-2 text-center">ประเภทการใช้งาน</legend>
        <div class="grid grid-cols-3 gap-2">
          <label v-for="category in categories" :key="category.value">
            <input
              type="radio"
              name="category"
              :value="category.value"
              v-model="selectedCategory"
              class="hidden"
            />
            <span
              class="block text-center p-2 rounded cursor-pointer text-white"
              :class="category.color"
            >
              {{ category.label }}
            </span>
          </label>
        </div>
        <p class="mt-4 text-center">
          คุณเลือก: <strong>{{ selectedCategory }}</strong>
        </p>
      </fieldset>

      <!-- ระดับราคา -->
      <fieldset class="mb-6">
        <legend class="text-lg font-semibold mb-2 text-center">ระดับราคา</legend>
        <div class="grid grid-cols-3 gap-2">
          <label v-for="price in prices" :key="price.min">
            <input
              type="radio"
              name="Price"
              v-model="selectedPrice"
              :value="price"
              class="hidden"
            />
            <span
              class="block text-center p-2 rounded cursor-pointer text-white"
              :class="price.color"
              style="white-space: pre-line;"
            >
              {{ price.label }}
            </span>
          </label>
        </div>
        <p class="mt-4 text-center">
          คุณเลือก: <strong>{{ selectedPrice.min }} - {{ selectedPrice.max }}</strong>
        </p>
      </fieldset>

      <!-- มือถือ -->
      <fieldset>
        <legend class="text-lg font-semibold mb-2 text-center">
          เลือก 3 รุ่น เพื่อเปรียบเทียบ
        </legend>
        <div class="grid grid-cols-3 gap-4">
          <div v-for="(mobile, index) in mobiles" :key="index">
            <input
              type="checkbox"
              :id="'mobile' + index"
              name="mobile"
              :value="mobile"
              :disabled="selectedMobiles.length >= 3 && !selectedMobiles.includes(mobile)"
              v-model="selectedMobiles"
            />
            <label :for="'mobile' + index" class="ml-2">{{ mobile }}</label>
          </div>
        </div>
        <p class="mt-4 text-center">คุณเลือก: {{ selectedMobiles.join(', ') }}</p>
        <button
          @click="compare"
          class="block mx-auto mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          เปรียบเทียบ
        </button>
      </fieldset>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import SamsungLogo from '../assets/img/logo_samsung.png'
import VivoLogo from '../assets/img/logo_vivo.png'
import XiaomiLogo from '../assets/img/logo_xiaomi.png'

export default {
  setup() {
    // Reactive properties
    const logos = ref([
      { name: 'Samsung', src: SamsungLogo },
      { name: 'Vivo', src: VivoLogo },
      { name: 'Xiaomi', src: XiaomiLogo },
    ])
    const mobiles = ref(['มือถือ01', 'มือถือ02', 'มือถือ03', 'มือถือ04', 'มือถือ05'])
    const categories = ref([
      { label: 'ใช้งานทั่วไป', value: 'general', color: 'bg-blue-500 hover:bg-blue-600' },
      { label: 'เล่นเกม', value: 'gaming', color: 'bg-green-500 hover:bg-green-600' },
      { label: 'ถ่ายรูปสวย', value: 'photography', color: 'bg-red-500 hover:bg-red-600' },
      { label: 'สำหรับไรเดอร์', value: 'rider', color: 'bg-yellow-500 hover:bg-yellow-600' },
      { label: 'AI Feature', value: 'ai', color: 'bg-purple-500 hover:bg-purple-600' },
      { label: 'วิดีโอ ไลฟ์สด', value: 'video', color: 'bg-pink-500 hover:bg-pink-600' },
    ])
    const prices = ref([
      { label: 'ระดับเริ่มต้น\n 0 - 5,000', min: 0, max: 5000, color: 'bg-blue-500 hover:bg-blue-600' },
      { label: 'ระดับกลาง\n 8,000 - 15,000', min: 8000, max: 15000, color: 'bg-green-500 hover:bg-green-600' },
      { label: 'ระดับพรีเมี่ยม\n 25,000 +++', min: 25000, max: 1000000, color: 'bg-red-500 hover:bg-red-600' },
    ])

    // Selected options
    const selectedMobiles = ref<string[]>([])
    const selectedLogos = ref<string[]>([])
    const selectedCategory = ref<string>('')
    const selectedPrice = ref<{ min: number, max: number }>({ min: 0, max: 0 })

    // Method to compare selected mobiles
    const compare = () => {
      if (selectedMobiles.value.length !== 3) {
        alert('กรุณาเลือก 3 รุ่นเพื่อเปรียบเทียบ')
      } else {
        alert(`คุณเลือก: ${selectedMobiles.value.join(', ')}`)
      }
    }

    return {
      logos,
      mobiles,
      categories,
      prices,
      selectedMobiles,
      selectedLogos,
      selectedCategory,
      selectedPrice,
      compare,
    }
  }
}
</script>


<style>
/* Custom styles if needed */
</style>
