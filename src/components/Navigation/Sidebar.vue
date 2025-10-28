<template>
  <div class="sidebar">
    <div class="flex align-center justify-between">
      <div class="flex align-center">
        <div class="logo flex">
          <img src="../../assets/logo_placeholder.svg" alt="Logo placeholder" />
        </div>
        <div class="title flex align-end">
          <h3>
            {{ title }}
          </h3>
          <span>{{ version }}</span>
        </div>
      </div>
      <div class="mobile-toggler flex" @click="toggleMobileNav">
        <icon-meteor-icons-ellipsis-vertical />
      </div>
    </div>
    <div class="navigation" :class="{ ['toggled']: toggled }">
      <NavLink link="/dashboard" label="Users">
        <template #icon>
          <icon-mage-users />
        </template>
      </NavLink>
      <NavLink link="/dashboard/create" label="Create user">
        <template #icon>
          <icon-mage-user-plus />
        </template>
      </NavLink>
    </div>
  </div>
</template>

<script setup>
import NavLink from "./NavLink.vue";

import { ref } from "vue";

defineProps({
  title: {
    type: String,
    default: "Dashboard",
  },
  version: {
    type: String,
    default: "v.01",
  },
});

const toggled = ref(false);
const emit = defineEmits(["nav-active"]);

const toggleMobileNav = () => {
  toggled.value = !toggled.value;

  emit("nav-active", toggled.value);
};
</script>

<style lang="scss" scoped>
.sidebar {
  box-sizing: border-box;
  position: fixed;
  width: 100%;
  padding: 15px;
  background-color: white;
  box-shadow: 0 2px 4px var(--shadow);

  @media (min-width: 992px) {
    position: relative;
    max-width: 300px;
    padding: 20px 15px;
    width: 100%;
    height: calc(100vh - 20px);
    top: 10px;
    left: 10px;
    border-radius: 10px;

    @media (min-width: 1200px) {
      max-width: 350px;
    }
  }

  .logo {
    img {
      height: 30px;
      margin-right: 8px;
    }
  }

  .title {
    span {
      margin-left: 3px;
      font-size: 10px;
      line-height: 1.3;
      color: var(--grey);
    }
  }

  .mobile-toggler {
    cursor: pointer;

    @media (min-width: 992px) {
      display: none;
    }
  }

  .navigation {
    box-sizing: border-box;
    padding: 15px;
    position: fixed;
    top: 70px;
    left: 10px;
    width: calc(100% - 20px);
    height: calc(100% - 80px);
    background-color: white;
    border-radius: 4px;
    transition: 0.3s;
    opacity: 0;
    transform: scale(0);
    visibility: hidden;
    box-shadow: 0 2px 4px transparent;

    @media (min-width: 992px) {
      position: relative;
      top: unset;
      left: unset;
      transform: scale(1);
      opacity: 1;
      visibility: visible;
      padding: 0;
      width: 100%;
      height: auto;
      border-radius: 0;
      border-top: 1px solid var(--off-white);
      padding-top: 20px;
      margin-top: 20px;
    }

    &.toggled {
      transition: 0.3s;
      opacity: 1;
      transform: scale(100%);
      visibility: visible;
      box-shadow: 0 2px 4px var(--shadow);
    }
  }
}
</style>
