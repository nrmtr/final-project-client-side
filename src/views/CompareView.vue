<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios'

interface PhoneSpec {
  display: string;
  processor: string;
  ram: string;
  camera: string;
  battery: string;
}

interface Phone {
  name: string;
  image: string;
  score: number | null;
  spec: PhoneSpec;
}

interface ApiResponse {
  phones: Phone[]; // Array of phone objects
  bestPhone: string; // Name of the best phone
}

export default defineComponent({
  data() {
    return {
      selectedMobiles: [] as string[],
      apicompare: null as ApiResponse | null,
    }
  },
  methods: {
    async fetchcompare() {
      try {
        const payload = {
          phones: this.selectedMobiles,
        }
        console.log('Payload being sent:', payload)

        const response = await axios.post('http://13.251.160.30/api/phone/compare', payload, {
          headers: {
            'Content-Type': 'application/json',
          },
        })

        // Transform the API response to an array of phones
        const phones = Object.values(response.data)
          .filter((item: any) => item.name) // Only keep items that have a 'name' property
          .map((item: any) => ({
            name: item.name,
            image: item.image,
            score: item.score,
            spec: item.spec,
          }))

        // Set the transformed data to apicompare
        this.apicompare = {
          phones,
          bestPhone: response.data.bestPhone,
        }

        console.log('API compare:', this.apicompare)
      } catch (error) {
        console.error('Error fetching brand details:', error)
        this.apicompare = null
        alert('ไม่สามารถดึงข้อมูลได้. กรุณาลองใหม่อีกครั้ง')
      }
    },
  },
  mounted() {
    const query = this.$route.query.mobiles
    if (query) {
      this.selectedMobiles = JSON.parse(query as string)
      this.fetchcompare() // Fetch comparison data on mount
    } else {
      alert('ไม่มีข้อมูลสำหรับเปรียบเทียบ')
    }
  },
})
</script>


<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-900">
    <div class="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-4xl">
      <br><br>
      <h1 class="text-center text-2xl font-bold mb-6">การเปรียบเทียบ</h1>
      <div v-if="apicompare && apicompare.phones" class="grid grid-cols-3 gap-4">
        <!-- Dynamic Phone Cards -->
        <div
          v-for="(phone, index) in apicompare.phones.slice(0, 3)"
          :key="index"
          class="grid gap-2 text-center border p-4 bg-gray-700 rounded-lg text-white border-4 border-white-600 shadow-xl"
        >
          <div>{{ phone.name }}</div>
          <div>
            <img
              :src="phone.image"
              alt="Phone image"
              class="mx-auto rounded-lg w-32 h-44 object-cover"
            />
          </div>
          <div>
            <strong>รายละเอียด:</strong>
            <ul>
              <li>หน้าจอ: {{ phone.spec.display }}</li>
              <li>โปรเซสเซอร์: {{ phone.spec.processor }}</li>
              <li>แรม: {{ phone.spec.ram }}</li>
              <li>กล้อง: {{ phone.spec.camera }}</li>
              <li>แบตเตอรี่: {{ phone.spec.battery }}</li>
            </ul>
          </div>
          <div>คะแนนรวม: {{ phone.score }}</div>
          <button class="bg-blue-500 text-white px-4 py-2 rounded">ดูรายละเอียดเพิ่มเติม</button>
        </div>
      </div>

      <h1 class="text-center text-2xl font-bold mb-6 mt-8">มือถือที่เราแนะนำให้คุณ</h1>
      <div v-if="apicompare?.bestPhone && apicompare.phones" class="grid grid-cols-2 gap-4 mt-4">
        <!-- Recommended Phone -->
        <div class="text-center border p-4">
          <strong>{{ apicompare.phones.find(phone => phone.name === apicompare?.bestPhone)?.name }}</strong>
          <img
            :src="apicompare.phones.find(phone => phone.name === apicompare?.bestPhone)?.image"
            alt="Recommended phone image"
            class="mx-auto rounded-lg w-40 h-54 object-cover mb-4"
          />
        </div>
        <!-- Recommended Phone Details -->
        <div class="grid grid-rows-3 gap-2 text-center border p-4">
          <div>คะแนนรวม: {{ apicompare.phones.find(phone => phone.name === apicompare?.bestPhone)?.score }}</div>
          <div>
            <strong>รายละเอียด:</strong>
            <ul>
              <li>หน้าจอ: {{ apicompare.phones.find(phone => phone.name === apicompare?.bestPhone)?.spec.display }}</li>
              <li>โปรเซสเซอร์: {{ apicompare.phones.find(phone => phone.name === apicompare?.bestPhone)?.spec.processor }}</li>
              <li>แรม: {{ apicompare.phones.find(phone => phone.name === apicompare?.bestPhone)?.spec.ram }}</li>
              <li>กล้อง: {{ apicompare.phones.find(phone => phone.name === apicompare?.bestPhone)?.spec.camera }}</li>
              <li>แบตเตอรี่: {{ apicompare.phones.find(phone => phone.name === apicompare?.bestPhone)?.spec.battery }}</li>
            </ul>
          </div>
          <button class="bg-green-500 text-white px-4 py-2 rounded">ดูรายละเอียดเพิ่มเติม</button>
        </div>
      </div>
      <div v-else>
        <p class="text-center text-white">ไม่มีมือถือแนะนำในขณะนี้</p>
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
