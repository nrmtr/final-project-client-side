<template>
  <div class="flex justify-center items-center min-h-screen bg-dark p-4">
    <div class="bg-light p-4 rounded-lg shadow-lg w-full max-w-6xl">
      <!-- Carousel with automatic banner slide -->
      <div class="overflow-hidden relative" style="padding: 30 70px">
        <div
          class="w-full h-full flex transition-all duration-1000"
          :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
        >
          <img
            src="@/assets/img/banner1.png"
            alt="Banner 1"
            class="w-full h-full rounded-lg object-cover"
            style="flex-shrink: 0; aspect-ratio: 16/9; max-height: 350px; margin-right: 2px"
          />
          <img
            src="@/assets/img/banner2.png"
            alt="Banner 2"
            class="w-full h-full rounded-lg object-cover"
            style="flex-shrink: 0; aspect-ratio: 16/9; max-height: 350px"
          />
        </div>

        <!-- Controls -->
        <button
          @click="moveToPrevBanner"
          class="absolute top-1/2 left-4 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full"
        >
          &lt;
        </button>
        <button
          @click="moveToNextBanner"
          class="absolute top-1/2 right-4 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full"
        >
          &gt;
        </button>
      </div>
      <br />

      <h1 class="custom-font text-center text-2xl font-bold mb-6 text-dark">
        โปรดเลือกหัวข้อที่ท่านต้องการ
      </h1>
      <h1 class="custom-font text-lg font-semibold mb-2 text-center text-dark">แบรนด์</h1>

      <!-- แบรนด์ -->
      <fieldset
        class="mb-6 border-2 border-primary p-4 rounded-lg flex flex-wrap justify-center gap-8"
      >
        <legend class="text-lg font-semibold mb-2 text-center text-dark">เลือกแบรนด์</legend>
        <label
          v-for="(logo, index) in logos"
          :key="index"
          class="cursor-pointer"
          :class="{
            'border-2': selectedLogos.includes(logo.value),
            'border-primary': selectedLogos.includes(logo.value),
            'border-opacity-50': !selectedLogos.includes(logo.value),
            'transition-all': true,
            'rounded-md': true,
          }"
        >
          <input type="checkbox" v-model="selectedLogos" :value="logo.value" class="hidden" />
          <img
            :src="logo.src"
            :alt="logo.name"
            class="w-16 h-16 rounded-md object-contain hover:opacity-75 transition-opacity duration-300"
          />
        </label>
      </fieldset>

      <h1 class="custom-font text-lg font-semibold mb-2 text-center text-dark">ประเภทการใช้งาน</h1>
      <!-- ประเภทการใช้งาน -->
      <fieldset class="mb-6 bg-gray-300 border-2 border-primary p-4 rounded-lg">
        <legend class="text-lg font-semibold mb-2 text-center text-dark"></legend>
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
          <label
            v-for="category in categories"
            :key="category.value"
            class="cursor-pointer"
            :class="
              selectedCategory === category.value
                ? 'border-2  rounded-lg'
                : 'border-2 border-gray-300 rounded-lg'
            "
          >
            <input
              type="radio"
              name="category"
              :value="category.value"
              v-model="selectedCategory"
              class="hidden"
            />
            <span
              class="block custom-font text-center p-2 rounded-lg cursor-pointer"
              :class="[
                category.color,
                selectedCategory === category.value ? 'bg-primary text-white' : 'text-black ',
              ]"
            >
              {{ category.label }}
            </span>
          </label>
        </div>
      </fieldset>

      <h1 class="custom-font text-lg font-semibold mb-2 text-center text-dark">ระดับราคา</h1>
     <!-- ระดับราคา -->
<fieldset class="mb-6 bg-gray-300 border-2 border-primary p-4 rounded-lg">
  <legend class="text-lg font-semibold mb-2 text-center text-dark"></legend>
  <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
    <label
      v-for="(pricer, index) in price_range"
      :key="pricer.value"
      class="cursor-pointer flex "
      :class="[
        selectedPrice === pricer.value ? 'border-2 rounded-lg' : 'border-2 border-gray-300 rounded-lg',
        index === price_range.length - 1 ? 'col-span-full ' : '' // ทำให้ปุ่มสุดท้ายขยายเต็มแถว
      ]"
    >
      <input
        type="radio"
        name="category"
        :value="pricer.value"
        v-model="selectedPrice"
        class="hidden"
      />
      <span
        class="block custom-font text-center p-4 rounded-lg cursor-pointer w-full "
        :class="[
          pricer.color,
          selectedPrice === pricer.value ? 'bg-primary text-white' : 'text-black'
        ]"
      >
        {{ pricer.label }}
      </span>
    </label>
  </div>
</fieldset>

      <!-- มือถือ -->
      <fieldset class="mb-6 border-2 border-primary p-4 rounded-lg">
        <legend class="custom-font text-lg font-semibold mb-2 text-center text-dark">
          เลือกโทรศัพท์มือถือ 3 รุ่น เพื่อทำการเปรียบเทียบ
        </legend>

        <div class="overflow-x-auto flex justify-center items-center">
          <div
            class="flex flex-wrap gap-4 justify-center"
            style="max-height: calc(5 * 5rem); width: 100%"
          >
            <label
              v-for="(mobile, index) in apiResponse.data"
              :key="mobile.slug"
              class="flex flex-col items-center w-1/3 sm:w-1/4 md:w-1/6"
              :class="selectedMobiles.includes(mobile.slug) ? '' : ''"
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
              <div
                class="flex custom-font flex-col items-center p-3 rounded-lg transition-all"
                :class="
                  selectedMobiles.includes(mobile.slug)
                    ? 'bg-primary-light border-2 border-primary text-white shadow-md'
                    : 'bg-white border border-gray-300 text-gray-700 hover:shadow-sm'
                "
              >
                <img
                  :src="mobile.image"
                  :alt="mobile.phone_name"
                  class="w-16 h-16 sm:w-24 sm:h-24 object-contain"
                />
                <label
                  :for="'mobile' + index"
                  class="mt-2 text-center text-sm font-medium"
                  :class="selectedMobiles.includes(mobile.slug) ? 'text-gray-800' : 'text-gray-800'"
                >
                  <div class="text-lg font-semibold text-blue-600">{{ mobile.phone_name }}</div>
                  <div class="mt-2 text-sm text-gray-500">{{ mobile.age }}</div>
                  <div class="font-semibold mt-2 text-sm text-gray-700">
                    {{ mobile.price.formatted }}
                  </div>
                </label>
              </div>
            </label>
          </div>
        </div>
        <div>
          <button
            @click="compare"
            class="block mx-auto mt-4 bg-primary text-white py-2 px-4 rounded hover:bg-primary-hover transition-colors"
          >
            เปรียบเทียบ
          </button>
          <popup v-if="showPopup" :message="popupMessage" @close="closePopup" />
        </div>
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
import Popup from './BBPopup.vue'

interface Mobile {
  slug: string
  image: string
  phone_name: string
  age: string
  price: { raw: string; formatted: string }
}
export default {
  components: {
    Popup,
  },
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
        { label: 'ใช้งานทั่วไป', value: 'general', color: 'bg-gray-100  hover:bg-gray-400' },
        { label: 'เล่นเกม', value: 'gaming', color: 'bg-gray-100 hover:bg-gray-400' },
        {
          label: 'ถ่ายรูปสวย',
          value: 'take beautiful photos',
          color: 'bg-gray-100 hover:bg-gray-400',
        },
        { label: 'สำหรับไรเดอร์', value: 'rider', color: 'bg-gray-100 hover:bg-gray-400' },
        { label: 'AI Feature', value: 'ai features', color: 'bg-gray-100 hover:bg-gray-400' },
        { label: 'วิดีโอ ไลฟ์สด', value: 'live streaming', color: 'bg-gray-100 hover:bg-gray-400' },
      ],
      price_range: [
        {
          label: 'ระดับเริ่มต้น\n 0 - 10,000',
          value: '0-10000',
          color: 'bg-gray-100 hover:bg-gray-400',
        },
        {
          label: 'ระดับกลาง\n 10,000 - 25,000',
          value: '10000-25000',
          color: 'bg-gray-100 hover:bg-gray-400',
        },
        {
          label: 'ระดับพรีเมี่ยม\n 25,000 +++',
          value: '25000++',
          color: 'bg-gray-100 hover:bg-gray-400',
        },
      ],
      selectedLogos: [] as string[],
      selectedMobiles: [] as string[], // Store selected logo values here
      apiResponse: { data: [] as Mobile[] }, // To store the response from the API
      selectedCategory: '',
      selectedPrice: '',
      // To store API response data
      currentIndex: 0,
      isVisible: true,
      showPopup: false,
      popupMessage: '',
    }
  },
  mounted() {
    setInterval(this.moveToNextBanner, 10000) // Slide every 10 seconds
  },
  methods: {
    compare() {
      if (this.selectedMobiles.length !== 3) {
        this.popupMessage = 'กรุณาเลือกข้อมูลให้ 3 รุ่น'
        this.showPopup = true
      } else {
        this.$router.push({
          name: 'compare',
          query: { mobiles: JSON.stringify(this.selectedMobiles) },
        })
      }
    },
    closePopup() {
      this.showPopup = false
    },

    async fetchBrandDetails() {
      if (this.selectedLogos.length === 0 || this.selectedCategory.length === 0 || this.selectedPrice.length === 0) {
        this.apiResponse = { data: [] }
        return
      }

      try {
        const payload = {
          brand: this.selectedLogos, // ส่งค่าที่เลือก
          category: this.selectedCategory, // ส่งประเภทการใช้งานที่เลือก
          price_range: this.selectedPrice,
        }
        const response = await axios.post('http://13.251.160.30/api/phone/typeofuse', payload, {
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (response.data && Array.isArray(response.data.data)) {
          this.apiResponse = response.data // เก็บข้อมูล API
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
    moveToPrevBanner() {
      this.currentIndex = this.currentIndex === 0 ? 1 : this.currentIndex - 1 // Loop back to last image
    },
    moveToNextBanner() {
      this.currentIndex = (this.currentIndex + 1) % 2 // Loop through 2 images
    },
  },

  watch: {
    selectedPrice() {
      this.fetchBrandDetails()
    },
    selectedLogos() {
      this.fetchBrandDetails()
    },
    selectedCategory() {
      this.fetchBrandDetails()
    },
  },
}
</script>

<style scoped>
/* Global Colors */
.bg-dark {
  background-color: #000000;
}

.bg-light {
  background-color: #ffffff;
}

.text-white {
  color: #ffffff;
}

.text-dark {
  color: #000000;
}

.border-primary {
  border-color: #000000;
}

.bg-primary {
  background-color: #000000;
}

.bg-primary-hover:hover {
  background-color: #333333;
}

/* Button Styling */
button {
  background-color: #000000;
  color: #ffffff;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #333333;
}

/* Other styles */
.shadow-lg {
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.border-4 {
  border-width: 4px;
}

.border-0 {
  border-width: 0;
}

.text-center {
  text-align: center;
}

.text-lg {
  font-size: 1.125rem;
}

.text-2xl {
  font-size: 1.5rem;
}

.font-bold {
  font-weight: 700;
}

.font-semibold {
  font-weight: 600;
}

.p-4 {
  padding: 1rem;
}

.p-6 {
  padding: 1.5rem;
}

.m-0 {
  margin: 0;
}

.mb-2 {
  margin-bottom: 0.5rem;
}

.mb-6 {
  margin-bottom: 1.5rem;
}

.w-full {
  width: 100%;
}

.max-w-4xl {
  max-width: 60rem;
}

.rounded-lg {
  border-radius: 0.5rem;
}

.hidden {
  display: none;
}

.cursor-pointer {
  cursor: pointer;
}

.hover\:opacity-75:hover {
  opacity: 0.75;
}

.transition-opacity {
  transition: opacity 0.3s;
}

.sm\:w-14 {
  width: 25%;
}

.sm\:w-13 {
  width: 33.33%;
}

.md\:w-16 {
  width: 16.67%;
}

.w-16 {
  width: 4rem;
}

.h-16 {
  height: 4rem;
}

.sm\:w-24 {
  width: 6rem;
}

.sm\:h-24 {
  height: 6rem;
}

.object-contain {
  object-fit: contain;
}

.grid {
  display: grid;
}

.grid-cols-3 {
  grid-template-columns: repeat(3, 1fr);
}

.grid-cols-2 {
  grid-template-columns: repeat(2, 1fr);
}

.sm\:grid-cols-9 {
  grid-template-columns: repeat(9, 1fr);
}

.gap-4 {
  gap: 1rem;
}

.gap-2 {
  gap: 0.5rem;
}

.place-items-center {
  place-items: center;
}

.overflow-x-auto {
  overflow-x: auto;
}

/* Global border-primary */
.border-primary {
  border-color: #000000; /* สีดำ */
}

/* กำหนดกรอบสีที่โปร่งใส */
.border-primary {
  border-color: rgb(7, 7, 7); /* กำหนดสีของกรอบให้เป็นขาว */
}

/* กรอบโปร่งใสที่ความโปร่งใส 50% */
.border-opacity-50 {
  border-color: rgba(255, 255, 255, 0.5); /* ความโปร่งใส 50% */
}

/* กรอบโปร่งใสเต็มที่ (ไม่โปร่งใส) */
.border-opacity-100 {
  border-color: rgba(255, 255, 255, 1); /* ความโปร่งใส 100% */
}

.w-full {
  width: 100%;
}

.h-full {
  height: 100%;
}

.object-cover {
  object-fit: cover;
}

@font-face {
  font-family: 'FC-Subject-Rounded-Regular';
  src: url('@/assets/myfonts/FC-Subject-Rounded-Regular.ttf') format('truetype');
}

.custom-font {
  font-family: 'FC-Subject-Rounded-Regular', sans-serif;
}
</style>
