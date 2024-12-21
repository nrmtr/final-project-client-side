<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-900">
    <div class="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-4xl">
      <h1 class="text-center text-2xl font-bold mb-6 text-white">เลือกหัวข้อที่ต้องการ</h1>

      <!-- แบรนด์ -->
      <fieldset class="mb-6">
        <legend class="text-lg font-semibold mb-2 text-center text-white">แบรนด์</legend>
        <div class="grid grid-cols-3 gap-4 place-items-center">
          <label v-for="(logo, index) in logos" :key="index" class="cursor-pointer">
            <input type="checkbox" v-model="selectedLogos" :value="logo.value" class="hidden" />
            <img
              :src="logo.src"
              :alt="logo.name"
              class="w-24 h-24 object-contain hover:opacity-75 transition-opacity duration-300"
            />
          </label>
        </div>
        <!-- Display selected logos in a box with clear visibility -->
        <div v-if="selectedLogos.length > 0" class="mt-4 text-center">
          <div class="bg-gray-700 p-4 rounded-lg text-white border-4 border-black-600 shadow-xl">
            <strong>คุณเลือกแบรนด์:</strong>
            <div class="flex flex-wrap justify-center mt-2">
              <span
                v-for="(logo, index) in selectedLogos"
                :key="index"
                class="bg-gray-600 text-white p-2 rounded-lg m-1"
              >
                {{ logo }}
              </span>
            </div>
          </div>
        </div>
        <button
          @click="fetchBrandDetails"
          class="block mx-auto mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
        >
          ดึงข้อมูลแบรนด์ที่เลือก
        </button>
        <!--  for api -->
      <div v-if="apiResponse" class="mt-4 text-center">
        <div class="bg-gray-700 p-4 rounded-lg text-white border-4 border-gray-600 shadow-xl">
          <strong>ข้อมูลแบรนด์:</strong>
          <p>รหัสแบรนด์: {{ apiResponse.id }}</p>
          <p>ชื่อแบรนด์: {{ apiResponse.name }}</p>
          <p>จำนวนอุปกรณ์: {{ apiResponse.devices }}</p>
        </div>
      </div>
      </fieldset>
      <!-- ประเภทการใช้งาน -->
      <fieldset class="mb-6">
        <legend class="text-lg font-semibold mb-2 text-center text-white">ประเภทการใช้งาน</legend>
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
        <div v-if="selectedCategory" class="mt-4 text-center">
          <div class="bg-gray-700 p-4 rounded-lg text-white border-4 border-white-600 shadow-xl">
            <strong>ประเภทการใช้งานที่เลือก:</strong>
            <div class="flex justify-center mt-2">
              <span class="bg-gray-600 text-white p-2 rounded-lg m-1">
                {{ selectedCategory }}
              </span>
            </div>
          </div>
        </div>
      </fieldset>

      <!-- ระดับราคา -->
      <fieldset class="mb-6">
        <legend class="text-lg font-semibold mb-2 text-center text-white">ระดับราคา</legend>
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
              style="white-space: pre-line"
            >
              {{ price.label }}
            </span>
          </label>
        </div>
        <div v-if="selectedPrice.min && selectedPrice.max" class="mt-4 text-center">
          <div class="bg-gray-700 p-4 rounded-lg text-white border-4 border-white-600 shadow-xl">
            <strong>ช่วงราคาที่เลือก:</strong>
            <div class="flex justify-center mt-2">
              <span class="bg-gray-600 text-white px-4 py-2 rounded-lg">
                {{ selectedPrice.min }} - {{ selectedPrice.max }}
              </span>
            </div>
          </div>
        </div>
      </fieldset>

      <!-- มือถือ -->
      <fieldset>
        <legend class="text-lg font-semibold mb-2 text-center text-white">
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
              class="hidden"
            />
            <label :for="'mobile' + index" class="ml-2 text-white">{{ mobile }}</label>
          </div>
        </div>
        <p class="mt-4 text-center text-white">คุณเลือก: {{ selectedMobiles.join(', ') }}</p>
        <button
          @click="compare"
          class="block mx-auto mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
        >
          เปรียบเทียบ
        </button>
      </fieldset>
    </div>
  </div>
</template>

<script lang="ts">
import SamsungLogo from '../assets/img/logo_samsung.png'
import VivoLogo from '../assets/img/logo_vivo.png'
import XiaomiLogo from '../assets/img/logo_xiaomi.png'
import axios from 'axios'

export default {
  data() {
    return {
      logos: [
        { name: 'Samsung', src: SamsungLogo, value: 'Samsung' },
        { name: 'Vivo', src: VivoLogo, value: 'Vivo' },
        { name: 'Xiaomi', src: XiaomiLogo, value: 'Xiaomi' },
      ],

      mobiles: ['มือถือ01', 'มือถือ02', 'มือถือ03', 'มือถือ04', 'มือถือ05'],
      categories: [
        { label: 'ใช้งานทั่วไป', value: 'general', color: 'bg-gray-500 hover:bg-gray-600' },
        { label: 'เล่นเกม', value: 'gaming', color: 'bg-gray-500 hover:bg-gray-600' },
        { label: 'ถ่ายรูปสวย', value: 'photography', color: 'bg-gray-500 hover:bg-gray-600' },
        { label: 'สำหรับไรเดอร์', value: 'rider', color: 'bg-gray-500 hover:bg-gray-600' },
        { label: 'AI Feature', value: 'ai', color: 'bg-gray-500 hover:bg-gray-600' },
        { label: 'วิดีโอ ไลฟ์สด', value: 'video', color: 'bg-gray-500 hover:bg-gray-600' },
      ],
      prices: [
        {
          label: 'ระดับเริ่มต้น\n 0 - 5,000',
          min: 1,
          max: 5000,
          color: 'bg-gray-500 hover:bg-gray-600',
        },
        {
          label: 'ระดับกลาง\n 8,000 - 15,000',
          min: 8000,
          max: 15000,
          color: 'bg-gray-500 hover:bg-gray-600',
        },
        {
          label: 'ระดับพรีเมี่ยม\n 25,000 +++',
          min: 25000,
          max: 1000000,
          color: 'bg-gray-500 hover:bg-gray-600',
        },
      ],
      selectedMobiles: [],
      selectedLogos: [], // Store selected logo values here
      apiResponse: null, // To store the response from the API
      selectedCategory: '',
      selectedPrice: { min: 0, max: 1000000 },
      // To store API response data
    }
  },
  methods: {
    compare() {
      if (this.selectedMobiles.length !== 3) {
        alert('กรุณาเลือก 3 รุ่นเพื่อเปรียบเทียบ')
      } else {
        alert(`คุณเลือก: ${this.selectedMobiles.join(', ')}`)
      }
    },
    async fetchBrandDetails() {
      if (this.selectedLogos.length === 0) {
        alert("กรุณาเลือกแบรนด์ก่อน.");
        return;
      }

      try {
        const response = await axios.post(
          "http://13.251.160.30/api/phone/typeofuse",
          {
            brand: this.selectedLogos, // Send selected logos
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        this.apiResponse = response.data; // Save API response
        console.log("API response:", response.data);

      } catch (error) {
        console.error("Error fetching brand details:", error);
        this.apiResponse = null;
        alert("ไม่สามารถดึงข้อมูลได้. กรุณาลองใหม่อีกครั้ง");
      }
    },
  },
}
</script>

<style scoped>
/* Dark theme customization */
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
