<template>
  <div class="container">
    <div class="resume-section__wrap">
      <h3 class="resume-section__header">{{ webProdDevConfig.sectionTitle }}</h3>
      <ProductCard :languageMode="webProdDevConfig.languageMode" :products-data="developProInfo" />
    </div>
  </div>
</template>
<script setup>
import { resumeNavMenu } from '@/utils/resumeUtils.js'
import ProductCard from '@/components/web_product/ProductCard.vue'

const webProdDevConfig = {
  sectionTitle: resumeNavMenu.find((item) => item.sectionID === 'web-prod-dev').title,
  languageMode: 'zh'
}

defineProps({
  developProInfo: {
    type: Array,
    required: true
  }
})
</script>
