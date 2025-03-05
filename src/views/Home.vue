<template>
  <div class="home">
    <button class="open-modal-btn" @click="openModal">
      Open Customer Selection
    </button>

    <CustomerSelectionModal
      :is-open="isModalOpen"
      @close="closeModal"
      @select-customer="handleCustomerSelect"
    />
  </div>
</template>

<script>
import { ref } from 'vue'
import CustomerSelectionModal from '@/components/CustomerSelectionModal.vue'

export default {
  name: 'HomePage',
  components: {
    CustomerSelectionModal
  },
  setup() {
    const isModalOpen = ref(false)

    const openModal = () => {
      isModalOpen.value = true
    }

    const closeModal = () => {
      isModalOpen.value = false
    }

    const handleCustomerSelect = (customer) => {
      console.log('Selected customer:', customer)
      // Handle the selected customer here
    }

    return {
      isModalOpen,
      openModal,
      closeModal,
      handleCustomerSelect
    }
  }
}
</script>