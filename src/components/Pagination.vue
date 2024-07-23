<script setup>
import { ref } from 'vue'

const props = defineProps({
  page: {
    type: Number,
    required: true
  },
  hasMore: {
    type: Boolean,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['updatePage'])

function previousPage() {
  if (props.page > 1) {
    emit('updatePage', props.page - 1)
  }
}

function nextPage() {
  if (props.hasMore) {
    emit('updatePage', props.page + 1)
  }
}
</script>

<template>
  <div class="pagination">
    <span>Page {{ page }} of {{ totalPages }}</span>
    <a
      class="pagination__link"
      @click="previousPage"
      :disabled="page === 1"
      :class="{ disabled: page === 1 }"
      >&#60; &#60; &#60; Previous
    </a>
    <a
      class="pagination__link"
      @click="nextPage"
      :disabled="!hasMore"
      :class="{ disabled: !hasMore }"
      >Next &#62; &#62; &#62;</a
    >
  </div>
</template>

<style lang="scss" scoped>
.pagination {
  display: flex;
  gap: 40px;
  margin: 20px 0 10px 0;

  &__link {
    flex: 1;
    text-decoration: none;
    white-space: nowrap;
    cursor: pointer;

    &:hover {
      color: black;
    }

    &.disabled {
      color: lightgrey;
      cursor: unset;
    }
  }
}
</style>
