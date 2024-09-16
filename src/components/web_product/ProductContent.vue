<style lang="scss" scoped>
@import '@/styles/main.scss';

.content {
  &__wrap {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  &__body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 1.25rem;
  }
  &__btn {
    width: 100%;
  }
  &__text {
    font-size: $font-sizes-7;
    color: $support;
    line-height: map-get($line-height, lg);
  }
  &__job {
    font-size: $font-sizes-7;
    color: $info;
    display: flex;
    align-items: flex-start;
  }
}
</style>
<template>
  <div class="content__wrap">
    <div class="content__body">
      <div>
        <h5 class="heading-h5 color-info">{{ contentData.info.website }}</h5>
        <p class="fs-7 color-auxiliary">{{ contentData.info.nature }}</p>
      </div>
      <ul class="list-unstyled d-flex flex-wrap" v-if="contentData.isShowDevelopLabel">
        <li
          v-for="developItem in contentData.develop_label"
          :key="developItem"
          class="tag bg-secondary-50 color-dark"
        >
          {{ developItem }}
        </li>
      </ul>
      <p class="content__job">
        <span class="material-symbols-outlined">
          {{ contentConfig.workIcon.role }}
        </span>
        <span class="ms-2">{{ contentData.info.role }}</span>
      </p>
      <div>
        <p v-if="isShowHighlights" class="d-flex align-items-start color-danger fs-fixed-7">
          <span class="material-symbols-outlined">{{ contentConfig.highlightsIcon }}</span>
          <span class="ms-2">{{ contentData.info.highlights }}</span>
        </p>
        <ul class="content__text ps-6">
          <li v-for="textItem in contentData.info.description" :key="textItem">{{ textItem }}</li>
        </ul>
        <p class="text-align-end pe-3">
          <a
            v-if="contentData.guideUrl !== ''"
            :href="contentData.guideUrl"
            target="_blank"
            class="fs-fixed-7 link-auxiliary"
          >
            <span>{{
              languageMode === 'en' ? contentConfig.readMore.textEn : contentConfig.readMore.textZh
            }}</span>
          </a>
        </p>
      </div>
    </div>
    <ul class="list-unstyled row">
      <li v-for="urlItem in contentData.linkUrl" :key="urlItem" class="col-6">
        <a :href="urlItem.url" target="_blank" class="btn btn-secondary content__btn"
          ><i class="bi" :class="turnUrlIcon(urlItem.type)"></i
          ><span class="mx-2" v-if="isMediaMdUp">{{
            turnUrlText(languageMode, urlItem.type)
          }}</span></a
        >
      </li>
    </ul>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { useMediaQuery } from '@vueuse/core'
import { mediaBreakpointConfig } from '@/utils/mediaUtils.js'

const isMediaMdUp = useMediaQuery(`(min-width: ${mediaBreakpointConfig.md})`)

const contentConfig = {
  workIcon: {
    role: 'badge',
    task: 'build'
  },
  productUrlConfig: [
    { type: 'github', icon: 'bi-github', textEn: 'source code', textZh: '原始碼' },
    { type: 'web', icon: 'bi-laptop', textEn: 'website', textZh: '網站' }
  ],
  highlightsIcon: 'social_leaderboard',
  readMore: {
    type: 'guide',
    textEn: 'read more about the features',
    textZh: '瀏覽更多功能介紹'
  }
}

const props = defineProps({
  contentData: {
    type: Object,
    required: true
  },
  languageMode: {
    type: String,
    required: true
  }
})

const isShowHighlights = computed(() => {
  return props.contentData.info.highlights !== ''
})

function turnUrlIcon(specifyType) {
  const specifyItem = contentConfig.productUrlConfig.find((item) => item.type === specifyType)
  return specifyItem.icon
}

function turnUrlText(language, specifyType) {
  const specifyItem = contentConfig.productUrlConfig.find((item) => item.type === specifyType)
  const text = language === 'en' ? specifyItem.textEn : specifyItem.textZh
  return text
}
</script>
