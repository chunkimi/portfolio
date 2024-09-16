<style lang="scss" scoped>
@import '@/styles/main.scss';
.proj {
  &__item {
    display: flex;
    flex-direction: column;
    align-items: start;
    margin-bottom: 1rem;
    @include media-breakpoint(lg) {
      flex-direction: row;
      align-items: center;
      margin-bottom: 0;
    }
  }
}
</style>
<template>
  <ul class="list-unstyled">
    <li v-for="projItem in workProjData" :key="projItem.id" class="d-flex proj__item">
      <p class="tag color-dark" :class="`bg-${typeColor}-50`">{{ typeText }}</p>
      <ProjItemContent
        :content="projItem.content"
        :is-show-url="projItem.isShowUrl"
        :url="projItem.url"
      />
    </li>
  </ul>
</template>
<script setup>
import { computed } from 'vue'
import { workProjTypeTitle } from '@/utils/resumeUtils.js'
import ProjItemContent from '@/components/resume/block/proj/ProjItemContent.vue'

const props = defineProps({
  workProjType: {
    type: String,
    required: true
  },
  workProjData: {
    type: Array,
    required: true
  }
})

const specifyType = computed(() => {
  return workProjTypeTitle.find((item) => item.type === props.workProjType)
})

const typeText = computed(() => {
  return specifyType.value.text
})
const typeColor = computed(() => {
  return specifyType.value.color
})
</script>
