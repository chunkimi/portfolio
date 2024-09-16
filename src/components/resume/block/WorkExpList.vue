<style lang="scss" scoped>
@import '@/styles/main.scss';

.exp-list {
  &__wrap {
    padding: 3rem 0rem;
  }
  &__side {
    &__img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center center;
      opacity: 0.75;
    }
  }
}

.chronology {
  &__card {
    position: relative;
    border-left: 0.25rem solid $secondary;
    padding-left: 2.5rem;
    padding-bottom: 2.5rem;
    &:before {
      content: '';
      position: absolute;
      width: 20px;
      height: 20px;
      background-color: $light;
      border-radius: 50%;
      border: 3px solid $secondary;
      top: 2rem;
      left: 0;
      transform: translateX(-60%);
    }
    &__body {
      padding-top: 1.25rem;
    }
    &__title {
      font-size: $font-sizes-5;
      font-weight: map-get($font-weight, normal);
      line-height: map-get($line-height, lg);
      color: $info;
    }
    &__subtitle {
      display: flex;
      align-items: center;
      font-size: $font-sizes-6;
      line-height: map-get($line-height, lg);
      color: $auxiliary;
    }
    &__textbox {
      padding: 0 3.5rem;
      width: 100%;
    }
  }
}
</style>

<template>
  <div class="container">
    <div class="row align-items-stretch justify-content-between exp-list__wrap">
      <div class="col-12 col-lg-9">
        <ul class="list-unstyled">
          <li v-for="expItem in expDataArr" :key="expItem.itemId" class="chronology__card">
            <div class="chronology__card__body">
              <h6 class="chronology__card__title">
                {{ expItem.position }}
              </h6>
              <p class="chronology__card__subtitle">
                <span class="material-symbols-outlined">{{
                  getTitleIcon(expListConfig.itemTitle, 'company')
                }}</span>
                <span class="ms-2">{{ expItem.company }}</span>
              </p>
              <p class="chronology__card__subtitle">
                <span class="material-symbols-outlined">{{
                  getTitleIcon(expListConfig.itemTitle, 'history')
                }}</span>
                <span class="ms-2">{{ expItem.history }}</span>
              </p>
              <ul class="chronology__card__textbox">
                <li v-for="infoItem in expItem.description" :key="infoItem.title" class="lh-lg">
                  <span>{{ infoItem.title }}</span>
                  <span class="fw-light color-support">{{ infoItem.text }}</span>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
      <div class="col-lg-2" v-if="isMediaLgUp">
        <img :src="getImage(expListConfig.sideImg)" alt="side-img" class="exp-list__side__img" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { useMediaQuery } from '@vueuse/core'
import { getImage } from '@/utils/imgUtils'
import { mediaBreakpointConfig } from '@/utils/mediaUtils.js'

const isMediaLgUp = useMediaQuery(`(min-width: ${mediaBreakpointConfig.lg})`)

const expListConfig = {
  itemTitle: [
    {
      type: 'position',
      icon: 'badge'
    },
    {
      type: 'company',
      icon: 'location_city'
    },
    {
      type: 'history',
      icon: 'work_history'
    }
  ],
  sideImg: 'assets/images/proj-list.jpg'
}
defineProps({
  expDataArr: {
    type: Array,
    required: true
  }
})

function getTitleIcon(iconData, specifyType) {
  return iconData.find((item) => item.type === specifyType).icon
}
</script>
