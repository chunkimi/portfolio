<style lang="scss" scoped>
@import '@/styles/main.scss';

.resume-profile {
  &__avatar {
    width: 100%;
    height: 100%;
    height: 100%;
    min-height: 80px;
    max-height: 400px;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    object-position: center center;
    border-radius: 50%;
  }
  &__name {
    margin-top: 1.5rem;
    color: $info;
    text-align: end;
    @include media-breakpoint(lg) {
      margin-top: 0;
      text-align: start;
    }
  }
}
</style>
<template>
  <div class="container">
    <div class="resume-section__wrap">
      <div class="row align-items-center justify-content-center my-10">
        <div class="col-6 col-lg-3 mb-6 mb-lg-0">
          <div class="d-flex justify-content-center align-items-center">
            <img :src="getImage(avatar)" alt="avatar" class="resume-profile__avatar" />
          </div>
        </div>
        <div class="col-12 col-lg-8">
          <h2 class="resume-profile__name heading-h2 ff-particular">
            {{ fullName }}
          </h2>
          <div class="color-support my-6" :class="isMediaLgUp ? 'fs-fixed-6' : 'fs-fixed-7'">
            <p class="mb-3">{{ position }}</p>
            <ul class="ps-6 fw-light">
              <li class="mb-3" v-for="summaryItem in profileSummary" :key="summaryItem">
                {{ summaryItem }}
              </li>
            </ul>
          </div>
          <ul class="list-unstyled">
            <li v-for="contactItem in contactInfo" :key="contactItem.type">
              <a
                :href="
                  contactItem.type === 'mail' ? `mailto:${contactItem.path}` : contactItem.path
                "
                target="_blank"
                class="text-decoration-none fz-fixed-6 link-success"
              >
                <i class="bi" :class="contactItem.icon"></i>
                <span class="ms-2">{{ contactItem.path }}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { useMediaQuery } from '@vueuse/core'
import { getImage } from '@/utils/imgUtils'
import { mediaBreakpointConfig } from '@/utils/mediaUtils.js'

const isMediaLgUp = useMediaQuery(`(min-width: ${mediaBreakpointConfig.lg})`)

const props = defineProps({
  profileData: {
    type: Object,
    required: true
  }
})

const profileInfo = computed(() => props.profileData)

const fullName = computed(() => `${profileInfo.value.firstName} ${profileInfo.value.lastName} `)

const position = computed(() => profileInfo.value.position)

const profileSummary = computed(() => profileInfo.value.summary)

const avatar = computed(() => profileInfo.value.avatar)

const contactInfo = computed(() => profileInfo.value.contact)
</script>
