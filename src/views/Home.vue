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
import CustomerSelectionModal from '@/components/CustomerSelectionModal.vue'

export default {
  name: 'HomePage',
  components: {
    CustomerSelectionModal
  },
  data() {
    return {
      isModalOpen: false
    }
  },
  methods: {
    openModal() {
      this.isModalOpen = true
    },
    closeModal() {
      this.isModalOpen = false
    },
    handleCustomerSelect(customer) {
      console.log('Selected customer:', customer)
      // Handle the selected customer here
    }
  }
}
</script>