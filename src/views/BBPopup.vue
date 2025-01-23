<template>
  <div v-if="isVisible" class="popup-overlay">
    <div class="popup-content">
      <!-- ชื่อหัวข้อ -->
      <h1 class="popup-title">เกิดข้อผิดพลาด</h1>
      <!-- ข้อความแสดงข้อผิดพลาด -->
      <p class="popup-message">{{ message }}</p>
      <!-- ปุ่มปิด -->
      <button class="popup-close-btn" @click="closePopup">ปิด</button>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: ['message'],
  data() {
    return {
      isVisible: true, // ใช้ควบคุมการแสดงผลของ popup
    }
  },
  methods: {
    closePopup() {
      this.isVisible = false // ปิด popup
      this.$emit('close') // Emit event ไปยัง parent
    },
  },
}
</script>

<style scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5); /* พื้นหลังที่ทึบ */
  display: flex;
  justify-content: center;
  align-items: center;
  animation: fadeIn 0.3s ease-in-out; /* เอฟเฟ็กต์การแสดง */
}

.popup-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 12px; /* ขอบมุมที่โค้ง */
  text-align: center;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2); /* เงา */
  animation: popupScale 0.3s ease-out; /* เอฟเฟ็กต์การขยาย */
}

.popup-title {
  font-size: 1.5rem; /* ขนาดตัวอักษร */
  margin-bottom: 10px;
  color: #ff1818; /* สีตัวอักษร */
  font-weight: bold; /* ตัวหนา */
}

.popup-message {
  font-size: 1rem;
  color: #555; /* สีของข้อความ */
  margin-bottom: 20px;
}

.popup-close-btn {
  background-color: #ff6347; /* สีแดงสด */
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.popup-close-btn:hover {
  background-color: #e55347; /* เปลี่ยนสีเมื่อ hover */
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes popupScale {
  0% {
    transform: scale(0.8); /* เริ่มต้นขนาดเล็ก */
  }
  100% {
    transform: scale(1); /* ขยายให้เป็นขนาดปกติ */
  }
}
</style>
