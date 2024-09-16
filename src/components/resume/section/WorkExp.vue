<template>
  <div class="container">
    <div class="resume-section__wrap">
      <h3 class="resume-section__header">{{ awardsConfig.sectionTitle }}</h3>
      <WorkExpList :exp-data-arr="workExpListData" />
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { resumeNavMenu } from '@/utils/resumeUtils.js'
import WorkExpList from '@/components/resume/block/WorkExpList.vue'

const awardsConfig = {
  sectionTitle: resumeNavMenu.find((item) => item.sectionID === 'work-exp').title
}

const props = defineProps({
  workExpInfo: {
    type: Array,
    required: true
  }
})

const workExpListData = computed(() => {
  return props.workExpInfo
    .map((workExpItem) => {
      const { id_type, work_exp_id, company, position, description, start_time, end_time } =
        workExpItem

      return {
        index: work_exp_id,
        itemId: `${id_type}-${work_exp_id}`,
        company,
        position,
        description,
        history: `${start_time}~${end_time}`
      }
    })
    .sort((a, b) => b.index.localeCompare(a.index, undefined, { numeric: true }))
})
</script>
