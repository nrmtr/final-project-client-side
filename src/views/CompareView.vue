<template>
  <div class="flex justify-center items-center min-h-screen bg-dark p-4">
    <div class="bg-light p-6 rounded-lg shadow-lg w-full max-w-7xl">
      <h1 class="custom-font text-center text-2xl font-bold mb-6 text-dark">การเปรียบเทียบ</h1>
      <div
        v-if="apicompare && apicompare.phones"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <!-- Dynamic Phone Cards -->
        <div
          v-for="(phone, index) in apicompare.phones.slice(0, 3)"
          :key="index"
          class="p-4 bg-gray-300 border-2 border-primary rounded-lg text-dark shadow-xl"
        >
          <div class="text-center mb-4">
            <h2 class="custom-font text-lg font-bold">{{ phone.name }}</h2>
            <img
              :src="phone.image"
              alt="Phone image"
              class="mx-auto rounded-lg w-32 h-44 object-contain my-4"
            />
          </div>
          <!-- รายละเอียดของมือถือ -->
          <div class="mb-4 custom-font">
            <!-- หน้าจอ -->
            <div
              class="p-4 border-2 rounded-lg mb-2"
              :class="{
                'bg-dark text-white': phone.specifications_score.display === maxScores.display,
                'bg-gray-200 text-black': phone.specifications_score.display !== maxScores.display,
              }"
              :style="{ 'height': '80px', 'overflow-y': 'auto' }"

            >
              <strong>หน้าจอ:</strong>
              {{ phone.spec.display }}
            </div>

            <!-- โปรเซสเซอร์ -->
            <div
              class="p-4 border-2 rounded-lg mb-2"
              :class="{
                'bg-dark text-white': phone.specifications_score.processor === maxScores.processor,
                'bg-gray-200 text-black':
                  phone.specifications_score.processor !== maxScores.processor,
              }"
              :style="{ 'height': '70px', 'overflow-y': 'auto' }"
            >
              <strong>โปรเซสเซอร์:</strong>
              {{ phone.spec.processor }}
            </div>

            <!-- แรม -->
            <div
              class="p-4 border-2 rounded-lg mb-2"
              :class="{
                'bg-dark text-white': phone.specifications_score.ram === maxScores.ram,
                'bg-gray-200 text-black': phone.specifications_score.ram !== maxScores.ram,
              }"
              :style="{ 'height': '65px', 'overflow-y': 'auto' }"
            >
              <strong>แรม:</strong>
              {{ phone.spec.ram }}
            </div>

            <!-- กล้อง -->
            <div
              class="p-4 border-2 rounded-lg mb-2"
              :class="{
                'bg-dark text-white': phone.specifications_score.camera === maxScores.camera,
                'bg-gray-200 text-black': phone.specifications_score.camera !== maxScores.camera,
              }"
              :style="{ 'height': '80px', 'overflow-y': 'auto' }"
            >
              <strong>กล้อง:</strong>
              {{ phone.spec.camera }}
            </div>

            <!-- แบตเตอรี่ -->
            <div
              class="p-4 border-2 rounded-lg mb-2"
              :class="{
                'bg-dark text-white': phone.specifications_score.battery === maxScores.battery,
                'bg-gray-200 text-black': phone.specifications_score.battery !== maxScores.battery,
              }"
              :style="{ 'height': '60px', 'overflow-y': 'auto' }"

            >
              <strong>แบตเตอรี่:</strong>
              {{ phone.spec.battery }}
            </div>

            <!-- คะแนนรวม -->
            <div
              class="p-4 border-2 rounded-lg mb-2"
              :class="{
                'bg-dark text-white': phone.score === maxTotalScore,
                'bg-gray-200 text-black': phone.score !== maxTotalScore,
              }"
              :style="{ 'max-height': '100px', 'overflow-y': 'auto' }"
            >
              <strong>คะแนนรวม:</strong>
              {{ phone.score }}
            </div>
          </div>

          <div class="text-center mt-4 custom-font">
            <button
              class="block mx-auto mt-4 bg-primary text-white py-2 px-4 rounded hover:bg-primary-hover transition-colors"
              @click="
                $router.push({ name: 'details', query: { mobiles: JSON.stringify([phone.slug]) } })
              "
            >
              ดูรายละเอียด
            </button>
          </div>
        </div>
      </div>

      <!-- Recommended Phone -->
      <h1 class="custom-font text-center text-2xl font-bold mb-6 mt-8 text-dark">
        โทรศัพท์มือถือที่เราแนะนำให้คุณ
      </h1>
      <div
        v-if="apicompare?.bestPhone && apicompare.phones"
        class="grid grid-cols-1 sm:grid-cols-2 gap-6"
      >
        <div
          class="custom-font text-dark text-center bg-gray-300 border-2 border-primary p-4 rounded-lg"
        >
          <h2 class="font-bold text-lg text-dark">
            {{ apicompare.phones.find((phone) => phone.name === apicompare?.bestPhone)?.name }}
          </h2>
          <img
            :src="apicompare.phones.find((phone) => phone.name === apicompare?.bestPhone)?.image"
            alt="Recommended phone"
            class="mx-auto rounded-lg w-40 h-54 object-contain mt-4"
          />
        </div>
        <div class="bg-gray-300 border-2 border-primary p-4 rounded-lg">
          <!-- คะแนนรวม -->
          <div class="mb-4 custom-font text-dark">
            <strong>คะแนนรวม</strong>
            <li class="p-2 rounded-lg mt-2 bg-light text-dark">
              {{ apicompare.phones.find((phone) => phone.name === apicompare?.bestPhone)?.score }}
            </li>
          </div>

          <!-- รายละเอียด -->
          <ul class="text-sm mt-4 custom-font text-dark">
            <li>
              <strong>รายละเอียด:</strong>
            </li>

            <!-- หน้าจอ -->
            <li class="p-2 rounded-lg mt-2 bg-light text-dark">
              หน้าจอ:
              {{
                apicompare.phones.find((phone) => phone.name === apicompare?.bestPhone)?.spec
                  .display
              }}
            </li>

            <!-- โปรเซสเซอร์ -->
            <li class="p-2 rounded-lg mt-2 bg-light text-dark">
              โปรเซสเซอร์:
              {{
                apicompare.phones.find((phone) => phone.name === apicompare?.bestPhone)?.spec
                  .processor
              }}
            </li>

            <!-- แรม -->
            <li class="p-2 rounded-lg mt-2 bg-light text-dark">
              แรม:
              {{
                apicompare.phones.find((phone) => phone.name === apicompare?.bestPhone)?.spec.ram
              }}
            </li>

            <!-- กล้อง -->
            <li class="p-2 rounded-lg mt-2 bg-light text-dark">
              กล้อง:
              {{
                apicompare.phones.find((phone) => phone.name === apicompare?.bestPhone)?.spec.camera
              }}
            </li>

            <!-- แบตเตอรี่ -->
            <li class="p-2 rounded-lg mt-2 bg-light text-dark">
              แบตเตอรี่:
              {{
                apicompare.phones.find((phone) => phone.name === apicompare?.bestPhone)?.spec
                  .battery
              }}
            </li>
          </ul>

          <!-- ปุ่มดูรายละเอียด -->
          <button
              class="block mx-auto mt-4 bg-primary text-white py-2 px-4 rounded hover:bg-primary-hover transition-colors"
              @click="
                $router.push({ name: 'details', query: { mobiles: JSON.stringify([apicompare.phones.find((phone) => phone.name === apicompare?.bestPhone)?.slug]) } })
              "
            >
              ดูรายละเอียด
            </button>
        </div>
      </div>
      <div v-else>
        <p class="text-center text-white">ไม่มีมือถือแนะนำในขณะนี้</p>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios'

interface PhoneSpec {
  display: string
  processor: string
  ram: string
  camera: string
  battery: string
}
interface PhoneSpecScore {
  display: number | null
  processor: number | null
  ram: number | null
  camera: number | null
  battery: number | null
  price: number | null
}
interface Phone {
  slug: string
  name: string
  image: string
  score: number | null
  spec: PhoneSpec
  specifications_score: PhoneSpecScore
}

interface ApiResponse {
  phones: Phone[] // Array of phone objects
  bestPhone: string // Name of the best phone
}

export default defineComponent({
  data() {
    return {
      selectedMobiles: [] as string[],
      apicompare: null as ApiResponse | null,
    }
  },
  computed: {
    maxScores(): Record<string, number | null> {
      if (!this.apicompare || !this.apicompare.phones) return {}

      const keys = ['display', 'processor', 'ram', 'camera', 'battery', 'price']
      const maxScores: Record<string, number | null> = {}

      keys.forEach((key) => {
        const scores = this.apicompare!.phones.map(
          (phone) => phone.specifications_score[key as keyof PhoneSpecScore]
        ).filter((score): score is number => score !== null) // กรอง null ออก

        maxScores[key] = scores.length ? Math.max(...scores) : null
      })

      return maxScores
    },
    maxTotalScore(): number | null {
      if (!this.apicompare || !this.apicompare.phones) return null

      const scores = this.apicompare.phones
        .map((phone) => phone.score)
        .filter((score): score is number => score !== null) // กรอง null ออก

      return scores.length ? Math.max(...scores) : null
    },
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
            slug: item.slug,
            name: item.name,
            image: item.image,
            score: item.score,
            spec: item.spec,
            specifications_score: item.specifications_score,
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
  background-color: #575757;
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

.bg-light {
  background-color: #ffffff;
}

.text-dark {
  color: #000000;
}

.border-primary {
  border-color: #000000;
}

.bg-dark {
  background-color: #000000;
}

.bg-primary {
  background-color: #000000;
}

@font-face {
  font-family: 'FC-Subject-Rounded-Regular';
  src: url('@/assets/myfonts/FC-Subject-Rounded-Regular.ttf') format('truetype');
}

.custom-font {
  font-family: 'FC-Subject-Rounded-Regular', sans-serif;
}

div[style*="overflow-y: auto"] {
  overflow-y: auto; /* ทำให้สามารถเลื่อนในแนวตั้งได้ */
  max-height: 100px; /* กำหนดความสูงสูงสุดของกล่อง */
}

div[style*="overflow-y: auto"]::-webkit-scrollbar {
  display: none;  /* ซ่อน scrollbar ในเบราว์เซอร์ที่รองรับ Webkit */
}

div[style*="overflow-y: auto"] {
  -ms-overflow-style: none;  /* ซ่อน scrollbar ใน IE และ Edge */
  scrollbar-width: none;  /* ซ่อน scrollbar ใน Firefox */
}
</style>
