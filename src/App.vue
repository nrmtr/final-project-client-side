<template>
  <div>
    <div class="layout">
      <Disclosure as="nav" class="bg-dark fixed top-0 left-0 w-full z-50" v-slot="{ open }">
        <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div class="relative flex h-16 items-center justify-between">
            <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <!-- Mobile menu button -->
              <DisclosureButton
                class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                <span class="sr-only">Open main menu</span>
                <Bars3Icon v-if="!open" class="block size-6" aria-hidden="true" />
                <XMarkIcon v-else class="block size-6" aria-hidden="true" />
              </DisclosureButton>
            </div>
            <div class="flex custom-font flex-1 items-center justify-center sm:items-stretch">
              <div class="hidden sm:ml-6 sm:block">
                <div class="flex space-x-4">
                  <RouterLink
                    v-for="item in navigation"
                    :key="item.name"
                    :to="item.href"
                    :class="[item.current ? 'bg-gray-950 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'rounded-md px-3 py-2 text-sm font-medium']"
                    :aria-current="item.current ? 'page' : undefined"
                    @click="updateCurrent(item.name)"
                  >
                    {{ item.name }}
                  </RouterLink>
                </div>
              </div>
            </div>
          </div>
        </div>
        <DisclosurePanel class="sm:hidden">
          <div class="space-y-1 px-2 pb-3 pt-2">
            <RouterLink
              v-for="item in navigation"
              :key="item.name"
              :to="item.href"
              :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'block rounded-md px-3 py-2 text-base font-medium']"
              :aria-current="item.current ? 'page' : undefined"
              @click="updateCurrent(item.name)"
            >
              {{ item.name }}
            </RouterLink>
          </div>
        </DisclosurePanel>
      </Disclosure>
      <div class="content fixed left-0 w-full h-full">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline';
import { RouterLink, RouterView } from 'vue-router';

const navigation = ref([
  { name: 'PhoneScout | เปรียบเทียบมือถือ', href: '/', current: true },
]);

const updateCurrent = (selectedName:string) => {
  navigation.value = navigation.value.map((item) => ({
    ...item,
    current: item.name === selectedName,
  }));
};

</script>

<style>
body {
  margin: 0; /* ปิด margin ของ body เพื่อไม่ให้เกิด Scrollbar */
  overflow: hidden; /* ปิด Scrollbar หลัก */
}

.layout {
  display: flex;
  flex-direction: column;
  height: 100vh; /* ใช้ความสูงเต็มหน้าจอ */
  overflow: hidden; /* ป้องกัน Scrollbar ซ้ำซ้อน */
}

.content {
  flex: 0; /* ให้พื้นที่เหลือของ Layout เป็นของ Content */
  margin-top: 4rem; /* ระยะเผื่อสำหรับ Navbar */
  padding: 1rem; /* เพิ่ม padding สำหรับ Content */
  padding-bottom: 4rem; /* เพิ่มพื้นที่ด้านล่าง */
  overflow-y: auto; /* เปิด Scrollbar แค่ในเนื้อหา */
  background-color: #000000;
}

@font-face {
  font-family: 'FC-Subject-Rounded-Regular';
  src: url('@/assets/myfonts/FC-Subject-Rounded-Regular.ttf') format('truetype');
}

.custom-font {
  font-family: 'FC-Subject-Rounded-Regular', sans-serif;
}

</style>
