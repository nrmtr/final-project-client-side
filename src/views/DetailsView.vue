<template>
  <div class="flex justify-center items-center min-h-screen bg-dark p-4">
    <div class="bg-light p-6 rounded-lg shadow-lg w-full max-w-6xl">
      <h1 class="custom-font text-center text-2xl font-bold mb-6 text-dark">รายละเอียดมือถือ</h1>

      <!-- Check if there are phone details to display -->
      <div v-if="apicompare?.phoneDetails?.length" class="">
        <div
          v-for="(phone, index) in apicompare.phoneDetails"
          :key="phone.id"
          class="bg-gray-200 p-6 rounded-lg shadow-lg"
        >
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Phone Image and Name -->
            <div class="text-center mb-6">
              <h2 class="text-xl font-bold custom-font text-dark">
                {{ phone.name }}
              </h2>
              <img
                :src="phone.image"
                alt="Phone image"
                class="mx-auto w-40 h-54 object-contain rounded-lg mt-4"
              />
            </div>

            <!-- Phone Specifications -->
            <div>
              <h3 class="text-lg font-bold custom-font text-dark mb-4">สเปคมือถือ:</h3>
              <div
                v-for="(spec, index) in phone.specifications"
                :key="index"
                class="mb-4 p-4 bg-gray-100 rounded-lg shadow-sm"
              >
                <h4 class="font-semibold text-primary text-lg mb-2">{{ spec.title }}</h4>
                <ul class="list-disc list-inside text-dark">
                  <li v-for="(s, i) in spec.specs" :key="i" class="p-2 bg-gray-200 rounded-lg mb-2">
                    <strong>{{ s.key }}:</strong> {{ s.val }}
                  </li>
                </ul>
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
</style>
