<template>
    <div class="price-range-container">
      <div class="input-container">
        <input class="text-black"
          type="number"
          v-model="minPrice"
          @input="validateMinPrice"
          :min="minValue"
          :max="maxValue"
        />
        <span>-</span>
        <input class="text-black"
          type="number"
          v-model="maxPrice"
          @input="validateMaxPrice"
          :min="minValue"
          :max="maxValue"
        />
      </div>
      <div class="slider-container">
        <input
          type="range"
          :min="minValue"
          :max="maxValue"
          v-model="minPrice"
          @input="validateMinPrice"
          class="slider"
        />
        <input
          type="range"
          :min="minValue"
          :max="maxValue"
          v-model="maxPrice"
          @input="validateMaxPrice"
          class="slider"
        />
      </div>
    </div>
  </template>
  
  <script lang="ts">
  export default {
    data() {
      return {
        minValue: 0, // ค่าต่ำสุดที่อนุญาต
        maxValue: 100000, // ค่าสูงสุดที่อนุญาต
        minPrice: 0, // ค่าเริ่มต้นของราคาต่ำสุด
        maxPrice: 100000, // ค่าเริ่มต้นของราคาสูงสุด
      };
    },
    methods: {
      validateMinPrice() {
        if (this.minPrice > this.maxPrice) {
          this.minPrice = this.maxPrice;
        }
      },
      validateMaxPrice() {
        if (this.maxPrice < this.minPrice) {
          this.maxPrice = this.minPrice;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .price-range-container {
    max-width: 400px;
    margin: 0 auto;
    font-family: Arial, sans-serif;
  }
  
  h6 {
    font-weight: 600;
    font-size: 14px;
    margin-bottom: 10px;
  }
  
  .input-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  
  .input-container input {
    width: 45%;
    padding: 5px 10px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .slider-container {
    margin-top: 10px;
  }
  
  .slider {
    width: 100%;
    margin: 10px 0;
  }
  </style>
  