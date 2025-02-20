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
              <br />
              <div class="p-2 rounded-lg bg-gray-100">
                <h2 class="ml-2 text-xl font-bold custom-font text-dark">ประเภทการใช้งาน</h2>
                <ul class="ml-2 mt-4 mb-2 list-disc list-inside">
                  <!-- ตรวจสอบว่า phone.tags เป็นอาร์เรย์หรือไม่ -->
                  <template v-if="Array.isArray(phone.tags)">
                    <!-- แสดงผลแต่ละข้อดีเป็น <li> -->
                    <li
                      v-for="(adv, index) in phone.tags"
                      :key="index"
                      class="bg-gray-200 rounded-lg p-2 mb-2 font-bold custom-font text-dark"
                    >
                      {{ adv.name }}
                    </li>
                  </template>
                  <!-- หากไม่ใช่อาร์เรย์ แสดงผลเป็นข้อความเดียว -->
                  <li v-else class="bg-gray-200 rounded-lg p-2 mb-2">
                    {{ phone.tags || 'ไม่มีข้อมูล' }}
                  </li>
                </ul>
              </div>
              <br />
              <div class="p-2 rounded-lg bg-gray-100">
                <h2 class="ml-2 text-xl font-bold custom-font text-dark">ข้อดี</h2>
                <ul class="ml-2 mt-4 mb-2 list-disc list-inside">
                  <!-- ตรวจสอบว่า phone.advantages เป็นอาร์เรย์หรือไม่ -->
                  <template v-if="Array.isArray(phone.advantages)">
                    <!-- แสดงผลแต่ละข้อดีเป็น <li> -->
                    <li
                      v-for="(adv, index) in phone.advantages"
                      :key="index"
                      class="bg-gray-200 rounded-lg p-2 mb-2 font-bold custom-font text-dark"
                    >
                      {{ adv.description }}
                    </li>
                  </template>
                  <!-- หากไม่ใช่อาร์เรย์ แสดงผลเป็นข้อความเดียว -->
                  <li v-else class="bg-gray-200 rounded-lg p-2 mb-2">
                    {{ phone.advantages || 'ไม่มีข้อมูล' }}
                  </li>
                </ul>
              </div>
              <br />
              <div class="p-2 rounded-lg bg-gray-100">
                <h2 class="ml-2 text-xl font-bold custom-font text-dark">ข้อเสีย</h2>
                <ul class="ml-2 mt-4 mb-2 list-disc list-inside">
                  <!-- ตรวจสอบว่า phone.disadvantages เป็นอาร์เรย์หรือไม่ -->
                  <template v-if="Array.isArray(phone.disadvantages)">
                    <!-- แสดงผลแต่ละข้อดีเป็น <li> -->
                    <li
                      v-for="(adv, index) in phone.disadvantages"
                      :key="index"
                      class="bg-gray-200 rounded-lg p-2 mb-2 font-bold custom-font text-dark"
                    >
                      {{ adv.description }}
                    </li>
                  </template>
                  <!-- หากไม่ใช่อาร์เรย์ แสดงผลเป็นข้อความเดียว -->
                  <li v-else class="bg-gray-200 rounded-lg p-2 mb-2">
                    {{ phone.disadvantages || 'ไม่มีข้อมูล' }}
                  </li>
                </ul>
              </div>
              <br />

              <div class="p-2 rounded-lg bg-gray-100">
                <h2 class="ml-2 text-xl font-bold custom-font text-dark">รีวิว</h2>
                <div class="flex flex-col gap-2 mt-4">
                  <div v-for="(review, index) in phone.reviews" :key="index" class="mb-2">
                    <!-- แสดงผลเป็น iframe หากลิงก์เป็นวิดีโอ -->
                    <iframe
                      v-if="isVideoLink(review.review_link)"
                      :src="getEmbedUrl(review.review_link)"
                      class="w-full h-48 rounded-lg"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen
                    ></iframe>

                    <!-- แสดงผลเป็นลิงก์ธรรมดาหากไม่ใช่วิดีโอ -->

                    <button
                      v-else
                      class="px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-600 transition-all"
                    >
                      <a :href="review.review_link" target="_blank" class="text-white">
                        ดูรีวิว {{ index + 1 }}
                      </a>
                    </button>
                  </div>
                </div>
              </div>

              <br />

              <div class="p-2 rounded-lg bg-gray-100">
                <h2 class="ml-2 text-xl font-bold custom-font text-dark">ร้านค้า</h2>
                <div class="flex flex-col gap-2 mt-4">
                  <button
                    v-for="(shop, index) in phone.shops"
                    :key="index"
                    class="px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-600 transition-all"
                  >
                    <a :href="shop.shop_link" target="_blank" class="text-white">
                      ดูร้านค้า {{ index + 1 }}
                    </a>
                  </button>
                </div>
              </div>
            </div>

            <!-- Phone Specifications -->
            <div>
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
                  <span style="color: black">{{ isOpen(index, specIndex) ? '-' : '+' }}</span>
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
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
// Type definitions
interface ApiResponse {
  phoneDetails: Phone[] // Array of phone objects
}

interface Shop {
  shop_link: string
}

interface Review {
  review_link: string
}

interface Tag {
  name: string
}

interface Advantage {
  description: string
}

interface Disadvantage {
  description: string
}

interface Phone {
  id: string
  brand: string
  name: string
  slug: string
  image: string
  tags: Tag[]
  advantages: Advantage[]
  disadvantages: Disadvantage[]
  details: string
  reviews: Review[]
  shops: Shop[]
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
      openAccordions: new Map<string, Set<number>>(), // Track open accordion states
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
    // ตรวจสอบว่าลิงก์เป็นวิดีโอหรือไม่
    isVideoLink(link: string): boolean {
      return link.includes('youtube.com') || link.includes('vimeo.com')
    },
    // แปลงลิงก์วิดีโอเป็น embed URL
    getEmbedUrl(link: string): string {
      if (link.includes('youtube.com')) {
        const videoId = this.extractYouTubeId(link)
        return `https://www.youtube.com/embed/${videoId}`
      } else if (link.includes('vimeo.com')) {
        const videoId = this.extractVimeoId(link)
        return `https://player.vimeo.com/video/${videoId}`
      }
      return link
    },

    // ดึง video ID จากลิงก์ YouTube
    extractYouTubeId(link: string): string {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
      const match = link.match(regExp)
      return match && match[2].length === 11 ? match[2] : ''
    },

    // ดึง video ID จากลิงก์ Vimeo
    extractVimeoId(link: string): string {
      const regExp = /^.*(vimeo.com\/)((channels\/[A-z]+\/)|(groups\/[A-z]+\/videos\/))?([0-9]+)/
      const match = link.match(regExp)
      return match ? match[5] : ''
    },

    async fetchdetails() {
      const selectedPhones = this.selectedphones.join(',')
      const url = `${API_BASE_URL}/phone/phone_details/${selectedPhones}`
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
              tags: Array.isArray(phone.tags)
                ? phone.tags.map((adv: any) => adv.name).join(', ')
                : phone.tags || 'N/A',
              advantages: Array.isArray(phone.advantages)
                ? phone.advantages.map((adv: any) => adv.description).join(', ')
                : phone.advantages || 'N/A',
              disadvantages: Array.isArray(phone.disadvantages)
                ? phone.disadvantages.map((adv: any) => adv.description).join(', ')
                : phone.disadvantages || 'N/A',

              details: phone.details,
              reviews: Array.isArray(phone.reviews)
                ? phone.reviews.map((adv: any) => adv.review_link).join(', ')
                : phone.reviews || 'N/A',
              shops: Array.isArray(phone.shops)
                ? phone.shops.map((shop: any) => ({ shop_link: shop }))
                : [{ shop_link: phone.shops || 'N/A' }],
              specifications: phone.specifications.map((spec: any) => ({
                title: spec.title,
                specs: spec.specs.map((s: any) => ({
                  key: s.key,
                  val: Array.isArray(s.val) ? s.val.join(', ') : s.val || 'N/A',
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
                tags: phoneData.tags,
                advantages: phoneData.advantages,
                disadvantages: phoneData.disadvantages,
                details: phoneData.details,
                reviews: phoneData.reviews,
                shops: phoneData.shops,
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

/* เพิ่มสไตล์ตามต้องการ */
iframe {
  width: 100%;
  height: 300px;
  border-radius: 8px;
}
</style>
