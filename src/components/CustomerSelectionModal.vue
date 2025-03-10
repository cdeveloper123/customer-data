<template>
  <div class="modal-overlay" v-if="isOpen" @click.self="close">
    <div class="modal-container">
      <!-- Header -->
      <div class="modal-header">
        <button class="back-button" @click="close">
          <i class="fas fa-arrow-left"></i>
        </button>
        <div class="header-content">
          <h2>Return items</h2>
          <h3>Select customer</h3>
        </div>
        <button class="close-button" @click="close">×</button>
      </div>

      <!-- Search -->
      <SearchBar 
        v-model="searchQuery"
        :filtered-count="filteredCustomers.length"
        :total-count="totalCustomers"
      />

      <!-- Customer List -->
      <div class="customers-list">
        <div v-if="loading" class="loading">
          Loading customers...
        </div>
        
        <div v-else-if="filteredCustomers.length === 0">
          <div class="no-customers-found">
            <div class="no-customers-found-text">
              No customers found
            </div>
          </div>
        </div>
        
        <div 
          v-else
          v-for="customer in filteredCustomers" 
          :key="customer.datasource_id"
          class="customer-row"
        >
          <div class="customer-info">
            <div class="initials-container">
              <div class="initials" :style="{ background: gradientStyle() }">
                {{ getInitials(customer.name, customer.name_2) }}
              </div>
              <i v-if="customer.status.toLowerCase() === 'approved'" class="fas fa-check-circle status-icon"></i>
            </div>
            <div class="customer-details">
              <div class="id-and-parent">
                <span class="customer-id">{{ customer.datasource_id }}</span>
                <span v-if="customer.parent" class="parent-info">
                  {{ customer.parent.name }} · {{ customer.parent.name_2 }}
                </span>
              </div>
              <div class="customer-names">
                <span class="name">{{ customer.name }}</span>
                <span class="separator"> · </span>
                <span class="name-2">{{ customer.name_2 }}</span>
              </div>
            </div>
          </div>
          <div class="row-right">
            <div class="customer-location-container">
              <div class="customer-location">
                {{ getCustomerCity(customer) }}
              </div>
            </div>
            <button class="start-return" @click="startReturn(customer)">
              Start return →
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchBar from '@/components/SearchBar.vue'

export default {
  name: 'CustomerSelectionModal',
  components: {
    SearchBar
  },
  props: {
    isOpen: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      loading: true,
      searchQuery: '',
    }
  },
  computed: {
    allCustomers() {
      return this.$store.getters.getCustomers
    },
    totalCustomers() {
      return this.allCustomers.length
    },
    filteredCustomers() {
      if (!this.searchQuery) return this.allCustomers
      
      const query = this.searchQuery.toLowerCase()
      return this.allCustomers.filter(customer => 
        customer.name.toLowerCase().includes(query) ||
        customer.datasource_id.toLowerCase().includes(query) ||
        (customer.name_2 && customer.name_2.toLowerCase().includes(query)) ||
        (customer?.parent?.name_2 && customer?.parent?.name_2.toLowerCase().includes(query)) ||
        (customer?.parent?.name && customer?.parent?.name.toLowerCase().includes(query))
      )
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    startReturn(customer) {
      this.$emit('select-customer', customer)
      this.close()
    },
    getInitials(name, name2) {
      if (!name) return ''
      const initials = []
      const firstNameInitial = name.split(' ')[0][0]
      initials.push(firstNameInitial)
      
      if (name2) {
        const secondNameInitial = name2.split(' ')[0][0]
        initials.push(secondNameInitial)
      }
      return initials.join('').toUpperCase()
    },
    getCustomerCity(customer) {
      if (customer.shipping_addresses?.length > 0) {
        const primaryAddress = customer.shipping_addresses.find(addr => addr.is_primary)
        return primaryAddress?.city || customer.shipping_addresses[0].city
      }
      return customer.store_locations?.[0]?.city || ''
    },
    gradientStyle() {
      return 'linear-gradient(133.53deg, #00FF94 2.44%, rgba(112, 0, 255, 0.17) 100%)'
    }
  },
  async mounted() {
    this.loading = true
    await this.$store.dispatch('fetchCustomers')
    this.loading = false
  }
}
</script>