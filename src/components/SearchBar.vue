<template>
  <div class="search-section">
    <div class="search-container">
      <i class="fas fa-search search-icon"></i>
      <input 
        type="text"
        placeholder="Search for ID or name"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      >
    </div>
    <div class="results-count">
      <span class="count">{{ filteredCount }}</span>
      <span class="text">of</span>
      <span class="count">{{ totalCount }}</span>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SearchBar',
  props: {
    modelValue: String,
    filteredCount: {
      type: Number,
      required: true
    },
    totalCount: {
      type: Number,
      required: true
    }
  },
  emits: ['update:modelValue']
})
</script> 