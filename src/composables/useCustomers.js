import { ref, computed } from 'vue'
import { useStore } from 'vuex'

export function useCustomers(emit) {
  const store = useStore()
  const searchQuery = ref('')
  const loading = ref(true)

  const allCustomers = computed(() => store.getters.getCustomers)
  
  const filteredCustomers = computed(() => {
    const customers = store.getters.getCustomers
    if (!searchQuery.value) return customers
    
    const query = searchQuery.value.toLowerCase()
    return customers.filter(customer => 
      customer.name.toLowerCase().includes(query) ||
      customer.datasource_id.toLowerCase().includes(query) ||
      (customer.name_2 && customer.name_2.toLowerCase().includes(query)) ||
      (customer?.parent?.name_2 && customer?.parent?.name_2.toLowerCase().includes(query)) ||
      (customer?.parent?.name && customer?.parent?.name.toLowerCase().includes(query))
    )
  })
  
  const totalCustomers = computed(() => allCustomers.value.length)

  const handleSelect = (customer) => {
    emit('select-customer', customer)
  }

  return {
    loading,
    searchQuery,
    filteredCustomers,
    allCustomers,
    handleSelect,
    totalCustomers
  }
} 