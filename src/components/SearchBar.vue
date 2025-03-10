<template>
  <div class="search-section">
    <div class="search-container">
      <i class="fas fa-search search-icon"></i>
      <input 
        type="text"
        placeholder="Search for ID or name"
        :value="value"
        @input="$emit('input', $event.target.value)"
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
export default {
  name: 'SearchBar',
  props: {
    value: String,
    filteredCount: {
      type: Number,
      required: true
    },
    totalCount: {
      type: Number,
      required: true
    }
  }
}
</script> 