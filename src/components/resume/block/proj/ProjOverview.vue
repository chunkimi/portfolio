<style lang="scss" scoped>
@import '@/styles/main.scss';

.overview {
  &__wrap {
    border: none;
  }
  &__menu {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    &__item {
      flex: 1;
      margin-right: 1rem;
      text-align: center;
      color: $support;
      border: 1px solid $auxiliary;
      border-bottom: 0;
      border-radius: 8px 8px 0 0;
      cursor: pointer;
      &:last-child {
        @include media-breakpoint(lg) {
          margin-right: 5rem;
        }
      }

      &:hover {
        background-color: rgba($auxiliary, 0.2);
      }
      &.active {
        background-color: rgba($support, 0.75);
        color: $light;
      }
    }
    &__text {
      padding: 0.25rem;
      display: flex;
      justify-content: center;
      align-items: center;
      @include media-breakpoint(lg) {
        padding: 0.5rem 0;
      }
    }
  }
  &__list {
    padding: 1.5rem 0.75rem;
    border: 1px solid $auxiliary;
    border-radius: 0 8px 8px 8px;
  }
}
</style>

<template>
  <div>
    <h4 class="resume-section__subtitle">{{ overviewConfig.sectionTitle }}</h4>
    <div class="overview__wrap">
      <ul class="list-unstyled overview__menu">
        <li
          v-for="navItem in overviewConfig.typeMenu"
          :key="navItem.type"
          @click="toggleType(navItem.type)"
          class="overview__menu__item"
          :class="navItem.type === projTypeMode ? 'active' : ''"
        >
          <p class="overview__menu__text">
            <span v-if="isMediaLgUp">{{ navItem.text }}</span>
            <span class="material-symbols-outlined" v-else>{{ navItem.icon }}</span>
          </p>
        </li>
      </ul>
      <div class="overview__list">
        <WorkProjList :work-proj-type="projTypeMode" :work-proj-data="projTypeData" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import { useMediaQuery } from '@vueuse/core'
import { mediaBreakpointConfig } from '@/utils/mediaUtils.js'
import { workProjTypeTitle } from '@/utils/resumeUtils.js'
import WorkProjList from '@/components/resume/block/proj/WorkProjList.vue'

const overviewConfig = {
  sectionTitle: '專案總覽',
  typeMenu: workProjTypeTitle
}

const isMediaLgUp = useMediaQuery(`(min-width: ${mediaBreakpointConfig.lg})`)

const props = defineProps({
  overviewData: {
    type: Array,
    required: true
  }
})

const prepOverviewData = computed(() => {
  return props.overviewData.filter((item) => item.originId !== '026' && item.originId !== '040')
})

const projTypeMode = ref('digital')
const projTypeData = ref(getTypeData('digital'))

function toggleType(specifyType) {
  projTypeMode.value = specifyType
  projTypeData.value = getTypeData(specifyType)
}

function getTypeData(type) {
  return prepOverviewData.value.filter((item) => item.projType === type)
}
</script>
