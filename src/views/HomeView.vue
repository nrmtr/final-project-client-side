<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-900 p-4">
    <div class="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-4xl">
      <h1 class="text-center text-2xl font-bold mb-6 text-white">เลือกหัวข้อที่ต้องการ</h1>

      <!-- แบรนด์ -->
      <fieldset class="mb-6">
        <legend class="text-lg font-semibold mb-2 text-center text-white">แบรนด์</legend>
        <div class="grid grid-cols-3 sm:grid-cols-9 gap-4 place-items-center">
          <label
            v-for="(logo, index) in logos"
            :key="index"
            class="cursor-pointer"
            :class="selectedLogos.includes(logo.value) ? 'border-4 border-green-500' : 'border-0'"
          >
            <input type="checkbox" v-model="selectedLogos" :value="logo.value" class="hidden" />
            <img
              :src="logo.src"
              :alt="logo.name"
              class="w-16 h-16 sm:w-24 sm:h-24 object-contain hover:opacity-75 transition-opacity duration-300"
            />
          </label>
        </div>
      </fieldset>

      <!-- ประเภทการใช้งาน -->
      <fieldset class="mb-6">
        <legend class="text-lg font-semibold mb-2 text-center text-white">ประเภทการใช้งาน</legend>
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
          <label
            v-for="category in categories"
            :key="category.value"
            class="cursor-pointer"
            :class="selectedCategory === category.value ? 'border-4 border-green-500' : 'border-0'"
          >
            <input
              type="radio"
              name="category"
              :value="category.value"
              v-model="selectedCategory"
              class="hidden"
            />
            <span
              class="block text-center p-2 rounded cursor-pointer text-white"
              :class="[category.color, selectedCategory === category.value ? 'bg-green-500' : '']"
            >
              {{ category.label }}
            </span>
          </label>
        </div>
      </fieldset>

      <!-- ระดับราคา -->
      <fieldset class="mb-6">
        <legend class="text-lg font-semibold mb-2 text-center text-white">ระดับราคา</legend>
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
          <label
            v-for="price in prices"
            :key="price.min"
            class="cursor-pointer"
            :class="
              selectedPrice.min === price.min && selectedPrice.max === price.max
                ? 'border-4 border-green-500'
                : 'border-0'
            "
          >
            <input
              type="radio"
              name="Price"
              v-model="selectedPrice"
              :value="price"
              class="hidden"
              @click="togglePrice(price)"
            />
            <span
              class="block text-center p-2 rounded cursor-pointer text-white"
              :class="[
                price.color,
                selectedPrice.min === price.min && selectedPrice.max === price.max
                  ? 'bg-green-500'
                  : '',
              ]"
              style="white-space: pre-line"
            >
              {{ price.label }}
            </span>
          </label>
        </div>
      </fieldset>

      <!-- มือถือ -->
      <fieldset>
        <legend class="text-lg font-semibold mb-2 text-center text-white">
          เลือก 3 รุ่น เพื่อเปรียบเทียบ
        </legend>
        <div class="overflow-x-auto">
          <div
            class="flex flex-wrap gap-4 justify-start"
            style="max-height: calc(5 * 5rem); width: 100%"
          >
            <label
              v-for="(mobile, index) in apiResponse.data"
              :key="mobile.slug"
              class="flex flex-col items-center w-1/3 sm:w-1/4 md:w-1/6"
              :class="selectedMobiles.includes(mobile.slug) ? 'border-4 border-green-500' : ''"
            >
              <input
                type="checkbox"
                :id="'mobile' + index"
                name="mobile"
                :value="mobile.slug"
                :disabled="selectedMobiles.length >= 3 && !selectedMobiles.includes(mobile.slug)"
                v-model="selectedMobiles"
                class="hidden"
              />
              <div class="flex flex-col items-center">
                <img
                  :src="mobile.image"
                  :alt="mobile.phone_name"
                  class="w-16 h-16 sm:w-24 sm:h-24 object-contain"
                />
                <label :for="'mobile' + index" class="text-white mt-2 text-center">
                  {{ mobile.phone_name }}
                </label>
              </div>
            </label>
          </div>
        </div>
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
import AppleLogo from '../assets/img/logo_apple.png'
import HonorLogo from '../assets/img/logo_honor.png'
import HuaweiLogo from '../assets/img/logo_huawei.png'
import OneplusLogo from '../assets/img/logo_oneplus.png'
import OppoLogo from '../assets/img/logo_oppo.png'
import RealmeLogo from '../assets/img/logo_realme.png'
import axios from 'axios'
import { defineComponent } from 'vue'

interface Mobile {
  slug: string
  image: string
  phone_name: string
}
interface Price {
  label: string
  min: number
  max: number
  color: string
}
export default {
  data() {
    return {
      logos: [
        { name: 'Samsung', src: SamsungLogo, value: 'Samsung' },
        { name: 'Vivo', src: VivoLogo, value: 'Vivo' },
        { name: 'Xiaomi', src: XiaomiLogo, value: 'Xiaomi' },
        { name: 'Apple', src: AppleLogo, value: 'Apple' },
        { name: 'Honor', src: HonorLogo, value: 'Honor' },
        { name: 'Huawei', src: HuaweiLogo, value: 'Huawei' },
        { name: 'Oneplus', src: OneplusLogo, value: 'Oneplus' },
        { name: 'Oppo', src: OppoLogo, value: 'Oppo' },
        { name: 'Realme', src: RealmeLogo, value: 'Realme' },
      ],

      categories: [
        { label: 'ใช้งานทั่วไป', value: 'general', color: 'bg-gray-500 hover:bg-gray-600' },
        { label: 'เล่นเกม', value: 'game', color: 'bg-gray-500 hover:bg-gray-600' },
        { label: 'ถ่ายรูปสวย', value: 'photography', color: 'bg-gray-500 hover:bg-gray-600' },
        { label: 'สำหรับไรเดอร์', value: 'rider', color: 'bg-gray-500 hover:bg-gray-600' },
        { label: 'AI Feature', value: 'ai', color: 'bg-gray-500 hover:bg-gray-600' },
        { label: 'วิดีโอ ไลฟ์สด', value: 'livestream', color: 'bg-gray-500 hover:bg-gray-600' },
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
      ] as Price[],
      selectedLogos: [] as string[],
      selectedMobiles: [] as string[], // Store selected logo values here
      apiResponse: { data: [] as Mobile[] }, // To store the response from the API
      selectedCategory: '',
      selectedPrice: { min: 0, max: 1000000 } as Price,
      // To store API response data
    }
  },
  methods: {
    togglePrice(price: Price) {
      if (this.selectedPrice.min === price.min && this.selectedPrice.max === price.max) {
        // Reset selection with default values
        this.selectedPrice = {
          label: 'ค่าเริ่มต้น',
          min: 0,
          max: 1000000,
          color: 'bg-gray-500',
        }
      } else {
        // Set new selection
        this.selectedPrice = price
      }
    },
    compare() {
      if (this.selectedMobiles.length !== 3) {
        alert('กรุณาเลือก 3 รุ่นเพื่อเปรียบเทียบ')
      } else {
        this.$router.push({
          name: 'compare',
          query: { mobiles: JSON.stringify(this.selectedMobiles) },
        })
      }
    },
    async fetchBrandDetails() {
      if (this.selectedLogos.length === 0) {
        this.apiResponse = { data: [] }
        return
      }
      if (this.selectedCategory.length === 0) {
        this.apiResponse = { data: [] }
        return
      }

      try {
        const payload = {
          brand: this.selectedLogos, // ส่งค่า selectedLogos,
          category: this.selectedCategory,
        }
        const response = await axios.post('http://13.251.160.30/api/phone/typeofuse', payload, {
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (response.data && Array.isArray(response.data.data)) {
          this.apiResponse = response.data // เก็บข้อมูลทั้งหมดใน apiResponse
        } else {
          console.error('Invalid data format:', response.data)
          alert('ข้อมูลที่ได้รับไม่ถูกต้อง')
        }
      } catch (error) {
        console.error('Error fetching brand details:', error)
        this.apiResponse = { data: [] }
        alert('ไม่สามารถดึงข้อมูลได้. กรุณาลองใหม่อีกครั้ง')
      }
    },
  },

  watch: {
    selectedPrice() {
      if (this.selectedPrice.min && this.selectedPrice.max) {
        this.fetchBrandDetails() // ดึงข้อมูลเมื่อมีแบรนด์ถูกเลือก
      } else {
        this.apiResponse = { data: [] }
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
