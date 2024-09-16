<style lang="scss" scoped>
@import '@/styles/main.scss';

.work-proj {
  &__link-tag {
    margin: 0.5rem;
    padding: 0.1rem 0.5rem;
    font-size: 1.25rem;
    font-weight: map-get($font-weight, light);
    color: $light;
    background-color: rgba(red($info), green($info), blue($info), 0.5);
    border-radius: 50px;
    &:hover,
    &:active {
      background-color: $secondary;
      color: $dark;
    }
  }
}
</style>
<template>
  <div class="ms-2 ms-lg-0">
    <a
      v-if="isShowUrl"
      :href="url"
      target="_blank"
      class="link-support text-decoration-none d-flex align-items-center"
    >
      <span class="fs-fixed-7">{{ content }}</span>
      <span class="material-symbols-outlined work-proj__link-tag">{{
        progContentConfig.readMore
      }}</span></a
    >
    <p class="color-support" v-else>{{ content }}</p>
  </div>
</template>
<script setup>
const progContentConfig = {
  readMore: 'visibility'
}

defineProps({
  content: {
    type: String,
    required: true
  },
  isShowUrl: {
    type: Boolean,
    required: true
  },
  url: {
    type: String,
    required: true
  }
})
</script>
