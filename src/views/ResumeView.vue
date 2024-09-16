<style lang="scss" scoped>
@import '@/styles/main.scss';

.resume {
  &__wrap {
    position: relative;
  }

  &__header {
    width: 100%;
    background: $primary;
    position: fixed;
    z-index: 999;
  }

  &__nav {
    &__brand {
      color: $info;
    }

    &__menu {
      background: $primary;
    }

    &__link {
      text-decoration: none;
      color: $info;
    }

    &__item {
      cursor: pointer;
      &:hover,
      &:focus,
      &:active {
        background-color: $info;
        .resume__nav__link {
          color: $primary;
        }
      }
    }

    &__toggle {
      color: $info;
      &:hover {
        color: $secondary;
      }
    }
  }

  &__main {
    padding-top: $header-nav-height;
    &__container {
      position: relative;
      background-attachment: fixed;
      background-position: bottom;
      background-image: url('@/assets/bg/wave-bottom.svg');
      background-repeat: no-repeat;
      background-size: contain;
      @include media-breakpoint(md) {
        background-position: 50% 110%;
      }
      &::before,
      &::after {
        content: '';
        position: fixed;
        display: block;
        z-index: -1;
        pointer-events: none;
      }
      &::before {
        width: 100vw;
        height: 160px;
        border-radius: 0 0 50% 50%;
        background-color: $primary;
        top: 0;
        left: 0;
      }

      &::after {
        width: 200vw;
        height: 50vh;
        background-color: #fff;
        border-radius: 50% 50% 0 0;
        top: 0;
        right: 0;
        transform: translate(-4%, 25%);
      }
    }
  }
  &__section {
    padding-top: $header-nav-height;
    &--fv {
      height: 100%;
      min-height: 100vh;
    }
  }
}
</style>

<template>
  <div class="resume__wrap">
    <header class="resume__header">
      <div class="navbar__wrap" :class="isMediaLgUp ? 'container' : ''">
        <h2 class="resume__nav__brand ff-particular heading-h5 navbar__brand">
          {{ resumeConfig.title }}
        </h2>
        <input
          ref="resumeNavToggle"
          type="checkbox"
          class="navbar__toggle__input"
          id="layout-navbar-toggle"
        />
        <label class="resume__nav__toggle navbar__toggle__label" for="layout-navbar-toggle">
          <span class="material-symbols-outlined navbar__toggle__icon">
            {{ resumeConfig.menuIcon }}</span
          >
        </label>
        <nav class="resume__nav__menu navbar__menu">
          <ul class="navbar__list">
            <li
              class="resume__nav__item navbar__item"
              v-for="linkItem in resumeConfig.navLink"
              :key="linkItem.title"
            >
              <p class="resume__nav__link navbar__link" @click="handleNavClick(linkItem.sectionID)">
                {{ linkItem.title }}
              </p>
            </li>
          </ul>
        </nav>
      </div>
    </header>
    <main class="resume__main">
      <div class="resume__main__container">
        <div class="py-12">
          <div class="resume__section resume__section--fv" id="intro">
            <ResumeProfile :profile-data="profileInfo" />
          </div>
          <div class="block-spacing">
            <div class="resume__section" id="work-skills">
              <WorkSkills :skills-data="workSkillsInfo" />
            </div>
            <div class="resume__section" id="web-prod-dev">
              <WebProdDev :develop-pro-info="developProInfo" />
            </div>
            <div class="resume__section resume__section--fv" id="work-proj">
              <WorkProj :proj-exp-description="projExpDescription" :work-proj-info="workProjInfo" />
            </div>
            <div class="resume__section" id="work-exp">
              <WorkExp :work-exp-info="workExpInfo" />
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import { useMediaQuery } from '@vueuse/core'
import { resumeNavMenu } from '@/utils/resumeUtils.js'
import { mediaBreakpointConfig } from '@/utils/mediaUtils.js'
import resumeProfileData from '@/data/resume_profile.json'
import productDevelopData from '@/data/web_product_develop.json'
import workProjData from '@/data/work_projects.json'
import workExpData from '@/data/work_experience.json'
import ResumeProfile from '@/components/resume/section/ResumeProfile.vue'
import WorkSkills from '@/components/resume/section/WorkSkills.vue'
import WebProdDev from '@/components/resume/section/WebProdDev.vue'
import WorkProj from '@/components/resume/section/WorkProj.vue'
import WorkExp from '@/components/resume/section/WorkExp.vue'

const isMediaLgUp = useMediaQuery(`(min-width: ${mediaBreakpointConfig.lg})`)

const resumeConfig = {
  title: "Kimi's Resume",
  menuIcon: 'menu',
  navLink: resumeNavMenu
}

const profileInfo = computed(() => {
  const { first_name, last_name, avatar, position, summary, contact } = resumeProfileData
  return {
    firstName: first_name,
    lastName: last_name,
    avatar,
    position,
    summary,
    contact
  }
})

const workSkillsInfo = computed(() => {
  const { pro_skills, web_dev_skills } = resumeProfileData
  return {
    proSkills: pro_skills,
    webDevSkills: web_dev_skills
  }
})

const developProInfo = ref(productDevelopData)

const projExpDescription = ref(resumeProfileData.proj_exp_description)

const workProjInfo = ref(workProjData)

const workExpInfo = ref(workExpData)

const resumeNavToggle = ref(null)
function handleNavClick(sectionID) {
  const getSection = `#${sectionID}`
  const section = document.querySelector(getSection)

  if (section) {
    section.scrollIntoView({ behavior: 'smooth', block: 'start' })
    closeNavCollapse()
  }
}

function closeNavCollapse() {
  if (resumeNavToggle.value && !isMediaLgUp.value) {
    resumeNavToggle.value.checked = false
  }
}
</script>
