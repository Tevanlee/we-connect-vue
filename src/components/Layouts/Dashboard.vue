<template>
  <div class="dashboard flex justify-between">
    <Sidebar @nav-active="getMobileNavState" />
    <div
      class="content"
      :class="{
        [`content-${alignContent}`]: alignContent,
        ['nav-active']: navToggled,
      }"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Sidebar from "../Navigation/Sidebar.vue";

defineProps({
  alignContent: {
    type: String,
    default: "",
  },
});

const navToggled = ref(false);

const getMobileNavState = (toggled) => {
  navToggled.value = toggled;
};
</script>

<style lang="scss" scoped>
.dashboard {
  overflow: hidden;
  .content {
    box-sizing: border-box;
    margin-top: 80px;
    padding: 15px;
    width: 100%;
    overflow-y: scroll;

    @media (min-width: 992px) {
      margin-top: 0;
      padding: 20px;
      width: calc(100% - 310px);
      height: 100vh;

      @media (min-width: 1200px) {
        width: calc(100% - 360px);
        padding: 40px;
      }
    }

    &.content-center {
      @media (min-width: 992px) {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    ::v-deep(.form-wrapper) {
      position: initial;
    }
  }
}
</style>
