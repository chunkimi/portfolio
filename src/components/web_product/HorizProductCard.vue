<style lang="scss" scoped>
@import '@/styles/main.scss';

.prod-horiz {
  &__img {
    width: 100%;
    height: 100%;
    min-height: 240px;
    max-height: 600px;
    object-fit: cover;
    object-position: center center;
    border-radius: 12px 12px 0 0;
    @include media-breakpoint(lg) {
      border-radius: 12px 0 0 12px;
    }
  }

  &__body {
    padding: 1.25rem 0.75rem;
    background-color: $light;
    border-radius: 12px;
    @include media-breakpoint(lg) {
      padding: 1.25rem 1.5rem;
    }
  }

  &__item {
    display: grid;
    flex-direction: column;
    margin-bottom: 2rem;
    border: 1px solid $auxiliary;
    border-radius: 12px;
    transition: box-shadow 0.3s ease;
    &:hover {
      box-shadow: 0.5rem 0.5rem 2rem rgba(0, 0, 0, 0.175);
    }
    @include media-breakpoint(lg) {
      display: grid;
      grid-template-columns: 2fr 3fr;
    }
  }
}
</style>

<template>
  <ul class="list-unstyled row">
    <li class="col-12" v-for="productItem in productInfoData" :key="productItem.cardId">
      <div class="prod-horiz__item">
        <img
          :src="getImage(turnProductImgPath(productItem.img))"
          alt="product-img"
          class="prod-horiz__img"
        />
        <div class="prod-horiz__body">
          <ProductContent :content-data="productItem" :language-mode="languageMode" />
        </div>
      </div>
    </li>
  </ul>
</template>
<script setup>
import { computed } from 'vue'
import { getImage } from '@/utils/imgUtils.js'
import { getWebProjDevData } from '@/utils/webDevUtils.js'
import ProductContent from '@/components/web_product/ProductContent.vue'

const props = defineProps({
  languageMode: {
    type: String,
    required: true
  },
  productsData: {
    type: Array,
    required: true
  }
})

const productInfoData = computed(() => {
  return getWebProjDevData(props.productsData, props.languageMode)
})

function turnProductImgPath(img) {
  return `assets/images/web_product/${img}__preview.jpg`
}
</script>
