<template>
    <div class="details-view">
      <h1>รายละเอียดมือถือ: {{ phone }}</h1>
      <!-- ดึงข้อมูลมือถือเพิ่มเติมจาก API -->
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue'
  import axios from 'axios'
  
  export default defineComponent({
    data() {
    return {
      phone: [] as string[],
      apicompare: null as ApiResponse | null,
    }
  },
    methods: {
    async fetchdetails() {
      try {
        const payload = {
          phones: this.phone,
        }
        console.log('Payload being sent:', payload)

        const response = await axios.post('http://13.251.160.30/api/phone/phone_details', payload, {
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
  })
  </script>
  
  <style scoped>
  /* Add your component styles here */
  </style>
  