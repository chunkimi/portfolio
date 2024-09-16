<template>
  <div>
    <h4 class="resume-section__subtitle">{{ awardsConfig.sectionTitle }}</h4>
    <ul class="list-unstyled">
      <li
        v-for="(awardItem, index) in awardsData"
        :key="awardItem.itemId"
        class="d-flex align-items-center"
        :class="index !== 0 ? 'mt-2' : ''"
      >
        <p class="tag d-flex align-items-center bg-warning-75 color-dark">
          <span class="material-symbols-outlined"> {{ awardItem.typeIcon }}</span>
          <span class="ms-2" v-if="isMediaMdUp">{{ awardItem.typeText }}</span>
        </p>
        <ProjItemContent
          :content="awardItem.content"
          :is-show-url="awardItem.isShowUrl"
          :url="awardItem.url"
        />
      </li>
    </ul>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { useMediaQuery } from '@vueuse/core'
import { mediaBreakpointConfig } from '@/utils/mediaUtils.js'
import awardsInfoData from '@/data/product_awards.json'
import ProjItemContent from '@/components/resume/block/proj/ProjItemContent.vue'

const awardsConfig = {
  sectionTitle: '獲獎專案',
  projectIcon: [
    { type: 'web', icon: 'computer', text: '前端開發' },
    { type: 'book', icon: 'menu_book', text: '出版編輯' }
  ]
}

const isMediaMdUp = useMediaQuery(`(min-width: ${mediaBreakpointConfig.md})`)

const awardsData = computed(() => {
  return awardsInfoData.map((award) => {
    const { award_id, prod_type, product_name, awards_info, is_show_url, url } = award

    const itemDescription = getTypeDescription(prod_type)
    const content = `${product_name}｜${awards_info}`
    return {
      itemId: award_id,
      typeIcon: itemDescription.icon,
      typeText: itemDescription.text,
      content,
      isShowUrl: is_show_url,
      url
    }
  })
})

function getTypeDescription(prodType) {
  return awardsConfig.projectIcon.find((item) => item.type === prodType)
}
</script>
