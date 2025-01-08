<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-900 p-4">
    <div class="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-6xl">
      <h1 class="text-center text-2xl font-bold mb-6 text-white">การเปรียบเทียบ</h1>
      <div
        v-if="apicompare && apicompare.phones"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <!-- Dynamic Phone Cards -->
        <div
          v-for="(phone, index) in apicompare.phones.slice(0, 3)"
          :key="index"
          class="p-4 bg-gray-700 rounded-lg text-white shadow-xl"
        >
          <div class="text-center">
            <h2 class="text-lg font-bold">{{ phone.name }}</h2>
            <img
              :src="phone.image"
              alt="Phone image"
              class="mx-auto rounded-lg w-32 h-44 object-contain my-4"
            />
          </div>
          <div>
            <strong>รายละเอียด:</strong>
            <ul class="text-sm">
              <li>
                <span
                  :class="
                    phone.specifications_score.display === maxScores.display ? 'text-green-500' : ''
                  "
                >
                  หน้าจอ: {{ phone.spec.display }}
                </span>
              </li>
              <li>
                <span
                  :class="
                    phone.specifications_score.processor === maxScores.processor
                      ? 'text-green-500'
                      : ''
                  "
                >
                  โปรเซสเซอร์: {{ phone.spec.processor }}
                </span>
              </li>
              <li>
                <span
                  :class="phone.specifications_score.ram === maxScores.ram ? 'text-green-500' : ''"
                >
                  แรม: {{ phone.spec.ram }}
                </span>
              </li>
              <li>
                <span
                  :class="
                    phone.specifications_score.camera === maxScores.camera ? 'text-green-500' : ''
                  "
                >
                  กล้อง: {{ phone.spec.camera }}
                </span>
              </li>
              <li>
                <span
                  :class="
                    phone.specifications_score.battery === maxScores.battery ? 'text-green-500' : ''
                  "
                >
                  แบตเตอรี่: {{ phone.spec.battery }}
                </span>
              </li>
              <li>
                <div
                  :class="{
                    'text-green-500': phone.score === maxTotalScore,
                    'text-white': phone.score !== maxTotalScore,
                  }"
                >
                  คะแนนรวม: {{ phone.score }}
                </div>
              </li>
            </ul>
          </div>
          <div class="text-center mt-4">
            <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
              ดูรายละเอียด
            </button>
          </div>
        </div>
      </div>

      <!-- Recommended Phone -->
      <h1 class="text-center text-2xl font-bold mb-6 mt-8 text-white">มือถือที่เราแนะนำให้คุณ</h1>
      <div
        v-if="apicompare?.bestPhone && apicompare.phones"
        class="grid grid-cols-1 sm:grid-cols-2 gap-6"
      >
        <div class="text-center bg-gray-700 p-4 rounded-lg">
          <h2 class="font-bold text-lg">
            {{ apicompare.phones.find((phone) => phone.name === apicompare?.bestPhone)?.name }}
          </h2>
          <img
            :src="apicompare.phones.find((phone) => phone.name === apicompare?.bestPhone)?.image"
            alt="Recommended phone"
            class="mx-auto rounded-lg w-40 h-54 object-contain mt-4"
          />
        </div>
        <div class="bg-gray-700 p-4 rounded-lg">
          <div>
            <strong>คะแนนรวม:</strong>
            {{ apicompare.phones.find((phone) => phone.name === apicompare?.bestPhone)?.score }}
          </div>
          
          <ul class="text-sm mt-4">
            <li>
              <strong>รายละเอียด:</strong>
            </li>
            <li>
              หน้าจอ:
              {{
                apicompare.phones.find((phone) => phone.name === apicompare?.bestPhone)?.spec
                  .display
              }}
            </li>
            <li>
              โปรเซสเซอร์:
              {{
                apicompare.phones.find((phone) => phone.name === apicompare?.bestPhone)?.spec
                  .processor
              }}
            </li>
            <li>
              แรม:
              {{
                apicompare.phones.find((phone) => phone.name === apicompare?.bestPhone)?.spec.ram
              }}
            </li>
            <li>
              กล้อง:
              {{
                apicompare.phones.find((phone) => phone.name === apicompare?.bestPhone)?.spec.camera
              }}
            </li>
            <li>
              แบตเตอรี่:
              {{
                apicompare.phones.find((phone) => phone.name === apicompare?.bestPhone)?.spec
                  .battery
              }}
            </li>
          </ul>
          <button
            class="bg-green-500 text-white px-4 py-2 rounded mt-4 hover:bg-green-600 transition"
          >
            ดูรายละเอียดเพิ่มเติม
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
