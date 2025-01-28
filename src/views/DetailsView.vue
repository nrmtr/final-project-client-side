<template>
  <div class="flex justify-center items-center min-h-screen bg-dark p-4">
    <div class="bg-light p-6 rounded-lg shadow-lg w-full max-w-7xl">
      <h1 class="custom-font text-center text-2xl font-bold mb-6 text-dark">รายละเอียดมือถือ</h1>

      <!-- Check if there are phone details to display -->
      <div v-if="apicompare?.phoneDetails?.length" class="">
        <div
          v-for="(phone, index) in apicompare.phoneDetails"
          :key="phone.id"
          class="bg-gray-300 p-6 rounded-lg shadow-lg"
        >
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Phone Image and Name -->
            <div class="mb-6 bg-gray-300">
              <div class="text-center p-2 rounded-lg bg-gray-100">
                <h2 class="mt-2 text-xl font-bold custom-font text-dark">
                {{ phone.name }}
              </h2>
              <img
                :src="phone.image"
                alt="Phone image"
                class="mx-auto w-40 h-54 object-contain rounded-lg mt-4 mb-4"
              />
              </div>
              <br>
              <div class="p-2 rounded-lg bg-gray-100">
                <h2 class="ml-2 text-xl font-bold custom-font text-dark">ประเภทที่เหมาะสม</h2>
                <h1 class="ml-2 mt-4 font-bold custom-font text-dark">
                  ใส่ประเภท
                </h1>
              </div>
              <br>
              <div class="p-2 rounded-lg bg-gray-100">
                <h2 class="ml-2 text-xl font-bold custom-font text-dark">ราคา</h2>
                <h1 class="ml-2 mt-4 font-bold custom-font text-dark">
                  ใส่ข้อมูลราคา
                </h1>
              </div>
              <br>
              <div class="p-2 rounded-lg bg-gray-100">
                <h2 class="ml-2 text-xl font-bold custom-font text-dark">ข้อมูลมือถือ</h2>
                <h1 class="ml-2 mt-4 font-bold custom-font text-dark">
                  ใส่รายละเอียดข้อมูล
                </h1>
              </div>
              <br>
              <div class="p-2 rounded-lg bg-gray-100">
                <h2 class="ml-2 text-xl font-bold custom-font text-dark">รีวิว</h2>
                <h1 class="ml-2 mt-4 font-bold custom-font text-dark">
                  ใส่ลิ้งรีวิว
                </h1>
              </div>
              <br>
              <div class="p-2 rounded-lg bg-gray-100">
                <h2 class="ml-2 text-xl font-bold custom-font text-dark">ร้านค้า</h2>
                <h1 class="ml-2 mt-4 font-bold custom-font text-dark">
                  ใส่ลิ้งร้านค้า
                </h1>
              </div>



            </div>



            <!-- Phone Specifications -->
            <div >
              <h3 class="text-lg font-bold custom-font text-dark mb-4">สเปคมือถือ:</h3>
              <div
                v-for="(spec, specIndex) in phone.specifications"
                :key="specIndex"
                class="mb-4 border rounded-lg overflow-hidden"
              >
                <button
                  class="w-full text-left p-4 bg-gray-100 hover:bg-gray-300 focus:outline-none flex justify-between items-center"
                  @click="toggleAccordion(index, specIndex)"
                >
                  <span class="font-semibold text-dark text-lg">{{ spec.title }}</span>
                  <span>{{ isOpen(index, specIndex) ? '-' : '+' }}</span>
                </button>
                <div v-show="isOpen(index, specIndex)" class="p-4 bg-gray-100">
                  <ul class="list-disc list-inside text-dark">
                    <li
                      v-for="(s, i) in spec.specs"
                      :key="i"
                      class="p-2 bg-gray-200 rounded-lg mb-2"
                    >
                      <strong>{{ s.key }}:</strong> {{ s.val }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Fallback if no phone details are available -->
      <div v-else>
        <p class="text-center text-white">ไม่มีข้อมูลเกี่ยวกับมือถือในขณะนี้</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios'

// Type definitions
interface ApiResponse {
  phoneDetails: Phone[] // Array of phone objects
}
interface Phone {
  id: string
  brand: string
  name: string
  slug: string
  image: string
  specifications: {
    title: string
    specs: { key: string; val: string }[]
  }[]
}

export default defineComponent({
  data() {
    return {
      selectedphones: [] as string[], // List of selected phones from query params
      apicompare: null as ApiResponse | null, // API response data
      openAccordions: new Map<string, Set<number>>() // Track open accordion states
    }
  },
  mounted() {
    const query = this.$route.query.mobiles
    if (query) {
      this.selectedphones = JSON.parse(query as string)
      this.fetchdetails()
    } else {
      alert('ไม่มีข้อมูลสำหรับเปรียบเทียบ')
    }
  },
  methods: {
    async fetchdetails() {
      const selectedPhones = this.selectedphones.join(',')
      const url = `http://13.251.160.30/api/phone/phone_details/${selectedPhones}`
      console.log('Requesting data from:', url)

      try {
        const response = await axios.get(url, {
          headers: {
            'Content-Type': 'application/json',
          },
        })

        console.log('Response received:', response.data)

        if (response.data.status) {
          const phoneData = response.data.data

          // Handle both single object and array cases
          let phoneDetails: Phone[] = []
          if (Array.isArray(phoneData)) {
            phoneDetails = phoneData.map((phone: any) => ({
              id: phone.id,
              brand: phone.brand,
              name: phone.name,
              slug: phone.slug,
              image: phone.image,
              specifications: phone.specifications.map((spec: any) => ({
                title: spec.title,
                specs: spec.specs.map((s: any) => ({
                  key: s.key,
                  val: Array.isArray(s.val) ? s.val.join(', ') : s.val,
                })),
              })),
            }))
          } else {
            phoneDetails = [
              {
                id: phoneData.id,
                brand: phoneData.brand,
                name: phoneData.name,
                slug: phoneData.slug,
                image: phoneData.image,
                specifications: phoneData.specifications.map((spec: any) => ({
                  title: spec.title,
                  specs: spec.specs.map((s: any) => ({
                    key: s.key,
                    val: Array.isArray(s.val) ? s.val.join(', ') : s.val,
                  })),
                })),
              },
            ]
          }

          this.apicompare = { phoneDetails }

          console.log('Transformed API compare:', this.apicompare)
        } else {
          console.error('API response status is false.')
        }
      } catch (error) {
        console.error('Error fetching phone details:', error)
      }
    },
    toggleAccordion(phoneIndex: number, specIndex: number) {
      const key = phoneIndex.toString()
      if (!this.openAccordions.has(key)) {
        this.openAccordions.set(key, new Set<number>())
      }
      const currentSet = this.openAccordions.get(key)!
      if (currentSet.has(specIndex)) {
        currentSet.delete(specIndex)
      } else {
        currentSet.add(specIndex)
      }
    },
    isOpen(phoneIndex: number, specIndex: number) {
      const key = phoneIndex.toString()
      return this.openAccordions.has(key) && this.openAccordions.get(key)!.has(specIndex)
    },
  },
})
</script>

<style scoped>
/* Styling similar to the comparison page */
.bg-dark {
  background-color: #000000;
}

.bg-light {
  background-color: #ffffff;
}

.text-dark {
  color: #000000;
}

.text-primary {
  color: #2563eb;
}

.bg-gray-100 {
  background-color: #f3f4f6;
}

.bg-gray-200 {
  background-color: #e5e7eb;
}

.custom-font {
  font-family: 'FC-Subject-Rounded-Regular', sans-serif;
}

.shadow-lg {
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}

.list-inside {
  padding-left: 1.5rem;
}

.list-disc {
  list-style-type: disc;
}

.cursor-pointer {
  cursor: pointer;
}
</style>
