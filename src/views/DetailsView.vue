<template>
  <div class="details-view">
    <h1>รายละเอียดมือถือ: {{ selectedphones }}</h1>
    <!-- ดึงข้อมูลมือถือเพิ่มเติมจาก API -->
  </div>
</template>
  
  <script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios'

export default defineComponent({
  data() {
    return {
      selectedphones: [] as string[],
      apicompare: null as ApiResponse | null,
    }
  },
  mounted() {
    const query = this.$route.query.mobiles
    if (query) {
    this.selectedphones = JSON.parse(this.$route.query.mobiles)
    this.fetchdetails()
  } else {
      alert('ไม่มีข้อมูลสำหรับเปรียบเทียบ')
    }
  },
  methods: {
    async fetchdetails() {
      // try {
        const selectedPhones = this.selectedphones.join(','); 
        const url = `http://13.251.160.30/api/phone/phone_details/${selectedPhones}`;
        console.log('Response url:', url)
        const response = await axios.get(url, {
          headers: {
            'Content-Type': 'application/json',
          },
        })

        console.log('Response received:', response.data)

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
      // } catch (error) {
      //   console.error('Error fetching brand details:', error)
      //   this.apicompare = null
      //   alert('ไม่สามารถดึงข้อมูลได้. กรุณาลองใหม่อีกครั้ง')
      // }
    },
  },
})
</script>
  
  <style scoped>
/* Add your component styles here */
</style>
  