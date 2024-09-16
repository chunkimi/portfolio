<style lang="scss" scoped>
.work-proj {
  &__container {
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
  }
}

.work-proj-overview-collapse-enter-active,
.work-proj-overview-collapse-leave-active {
  transition: opacity 0.5s ease;
}

.work-proj-overview-collapse-enter-from,
.work-proj-overview-collapse-leave-to {
  opacity: 0;
}
</style>
<template>
  <div class="container">
    <div class="resume-section__wrap">
      <h3 class="resume-section__header">{{ awardsConfig.sectionTitle }}</h3>
      <div class="work-proj__container">
        <ProjAwards />
        <ProjExpSummary :proj-summary-data="projExpSummaryData" />
        <ProjHighlights :highlights-data="projHighlightsDate" />
        <div class="d-flex justify-content-center">
          <button type="button" class="btn btn-outline-auxiliary" @click="toggleExtend">
            <span class="d-flex align-items-center">
              <span>{{ extendText }}</span>
              <span class="material-symbols-outlined">{{ extendIcon }}</span>
            </span>
          </button>
        </div>
        <transition name="work-proj-overview-collapse">
          <ProjOverview :overview-data="projOverviewData" v-if="isExtend" />
        </transition>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import { resumeNavMenu } from '@/utils/resumeUtils.js'

import ProjExpSummary from '@/components/resume/block/proj/ProjExpSummary.vue'
import ProjAwards from '@/components/resume/block/proj/ProjAwards.vue'
import ProjHighlights from '@/components/resume/block/proj/ProjHighlights.vue'
import ProjOverview from '@/components/resume/block/proj/ProjOverview.vue'

const awardsConfig = {
  sectionTitle: resumeNavMenu.find((item) => item.sectionID === 'work-proj').title,
  extend: {
    text: {
      less: '關閉專案清單',
      more: '觀看更多專案'
    },
    icon: {
      less: 'keyboard_arrow_up',
      more: 'keyboard_arrow_down'
    }
  }
}

const props = defineProps({
  projExpDescription: {
    type: Object,
    required: true
  },
  workProjInfo: {
    type: Array,
    required: true
  }
})

const isExtend = ref(false)
const extendIcon = computed(() => {
  return isExtend.value ? awardsConfig.extend.icon.less : awardsConfig.extend.icon.more
})

const extendText = computed(() => {
  return isExtend.value ? awardsConfig.extend.text.less : awardsConfig.extend.text.more
})

function toggleExtend() {
  isExtend.value = !isExtend.value
}

const projExpSummaryData = computed(() => props.projExpDescription)

const projHighlightsDate = computed(() => {
  return props.workProjInfo
    .filter((originItem) => originItem.is_highlight && originItem.is_show)
    .map((projItem) => {
      const { proj_id, proj_type, subcategory, title, note, is_show_url, url } = projItem

      return {
        originId: proj_id,
        id: `proj-${proj_id}`,
        projType: proj_type,
        subcategory,
        content: `${note}｜${title}`,
        isShowUrl: is_show_url,
        url
      }
    })
})

const projOverviewData = computed(() => {
  return props.workProjInfo
    .filter((originItem) => originItem.is_show)
    .map((projItem) => {
      const { proj_id, proj_type, subcategory, title, note, is_show_url, url } = projItem

      return {
        id: `proj-${proj_id}`,
        projType: proj_type,
        subcategory,
        content: `${note}｜${title}`,
        isShowUrl: is_show_url,
        url
      }
    })
})
</script>
