import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    customers: []
  },
  
  getters: {
    getCustomers: state => state.customers
  },
  
  mutations: {
    SET_CUSTOMERS(state, customers) {
      state.customers = customers.result
    }
  },
  
  actions: {
    async fetchCustomers({ commit }) {
      try {
        const response = await axios.get(process.env.BASE_URL + 'mock-customers.json')
        commit('SET_CUSTOMERS', response.data)
        return response.data.result
      } catch (error) {
        console.error('Error fetching customers:', error)
        console.error('Error details:', error.response || error.message)
        return []
      }
    }
  }
}) 