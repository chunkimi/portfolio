<style lang="scss" scoped>
@import '@/styles/main.scss';

.proj-summary {
  &__wrap {
    position: relative;
    padding: 3.75rem 5rem;

    &::before,
    &::after {
      position: absolute;
      pointer-events: none;
      z-index: 5;
      color: $secondary;
      font-size: 3rem;
      line-height: map-get($line-height, lg);
      font-weight: map-get($font-weight, bold);
    }

    &::before {
      content: '“';
      top: 0;
      left: 1.5rem;
    }

    &::after {
      content: '”';
      bottom: 0;
      right: 1.5rem;
    }
  }
}
</style>
<template>
  <div class="proj-summary__wrap">
    <p class="fs-fixed-6 fw-light mb-4">{{ preface }}</p>
    <ul class="ps-6">
      <li v-for="summaryItem in summaryPoints" :key="summaryItem.title" class="fs-fixed-7 mb-2">
        <p>
          <span class="">{{ summaryItem.title }}</span>
          <span class="fw-light color-support">{{ `：${summaryItem.text}` }}</span>
        </p>
      </li>
    </ul>
  </div>
</template>
<script setup>
import { computed } from 'vue'
const props = defineProps({
  projSummaryData: {
    type: Object,
    required: true
  }
})

const preface = computed(() => {
  return props.projSummaryData.preface
})

const summaryPoints = computed(() => {
  return props.projSummaryData.summary
})
</script>
