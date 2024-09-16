<style lang="scss" scoped>
@import '@/styles/main.scss';
</style>

<template>
  <div>
    <h4 class="resume-section__subtitle">{{ highlightsConfig.sectionTitle }}</h4>
    <WorkProjList :work-proj-type="`digital`" :work-proj-data="digitalProj" />
    <WorkProjList :work-proj-type="`exhibition`" :work-proj-data="exhibitionProj" />
    <WorkProjList :work-proj-type="`planning`" :work-proj-data="planningProj" />
    <WorkProjList :work-proj-type="`writing`" :work-proj-data="writingProj" />
    <WorkProjList :work-proj-type="`activity`" :work-proj-data="activityProj" />
  </div>
</template>
<script setup>
import { computed } from 'vue'
import WorkProjList from '@/components/resume/block/proj/WorkProjList.vue'
const highlightsConfig = {
  sectionTitle: '重點專案'
}

const props = defineProps({
  highlightsData: {
    type: Array,
    required: true
  }
})

const digitalProj = computed(() => {
  return props.highlightsData.filter((item) => item.subcategory === 'metadata')
})

const exhibitionProj = computed(() => {
  return props.highlightsData.filter((item) => item.projType === 'exhibition')
})

const writingProj = computed(() => {
  return props.highlightsData.filter((item) => item.projType === 'writing')
})

const activityProj = computed(() => {
  return props.highlightsData.filter((item) => item.projType === 'activity')
})

const planningProj = computed(() => {
  return props.highlightsData.filter((item) => item.projType === 'planning')
})
</script>
