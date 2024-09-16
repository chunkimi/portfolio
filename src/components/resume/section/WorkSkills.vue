.
<style lang="scss" scoped>
@import '@/styles/main.scss';
.work-skill {
  &__card {
    height: 100%;
    padding: 1.25rem 0.75rem;
    border-radius: 12px;
    background-color: rgba($auxiliary, 0.15);
  }
}
</style>
<template>
  <div class="container">
    <div class="resume-section__wrap">
      <h3 class="resume-section__header">{{ workSkillConfig.sectionTitle }}</h3>
      <div class="row">
        <div class="col-12 col-lg-6 mb-6 mb-lg-0">
          <div class="work-skill__card">
            <h4 class="resume-section__subtitle">{{ webDevSkills.title }}</h4>
            <ul class="ps-6">
              <li
                class="fs-fixed-6 fw-light color-support"
                v-for="skillItem in webDevSkills.skills"
                :key="skillItem.category"
              >
                <p class="lh-lg">
                  <span>{{ getSkillsContent(skillItem.items) }}</span>
                </p>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-12 col-lg-6 mb-6 mb-lg-0">
          <div class="work-skill__card">
            <h4 class="resume-section__subtitle">{{ proSkills.title }}</h4>
            <ul class="ps-6">
              <li
                class="fs-fixed-6 fw-light color-support"
                v-for="skillItem in proSkills.skills"
                :key="skillItem.category"
              >
                <p class="lh-lg">
                  <span>{{ getSkillsContent(skillItem.items) }}</span>
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { resumeNavMenu } from '@/utils/resumeUtils.js'

const workSkillConfig = {
  sectionTitle: resumeNavMenu.find((item) => item.sectionID === 'work-skills').title
}

const props = defineProps({
  skillsData: {
    type: Object,
    required: true
  }
})

const proSkills = computed(() => props.skillsData.proSkills)

const webDevSkills = computed(() => props.skillsData.webDevSkills)

function getSkillsContent(skillsArr) {
  return skillsArr
    .map((item, index) => {
      return index !== 0 ? `、${item}` : `${item}`
    })
    .join('')
}
</script>
