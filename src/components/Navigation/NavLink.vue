<template>
  <router-link class="nav-link flex align-center justify-between" :to="link">
    <div class="flex align-center">
      <div class="icon" v-if="$slots.icon">
        <slot name="icon"></slot>
      </div>
      {{ label }}
    </div>
    <slot name="arrow">
      <icon-mage-chevron-right class="arrow" />
    </slot>
  </router-link>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    default: "Link Text",
    required: true,
  },
  link: {
    type: String,
    default: "/",
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.nav-link {
  box-sizing: border-box;
  padding: 10px 12px;
  width: 100%;
  color: var(--grey);
  background-color: transparent;
  border-radius: 14px;
  font-weight: 400;
  font-size: 15px;
  transition: 0.2s;
  margin-bottom: 10px;
  border: 1px solid transparent;

  .icon {
    height: 20px;
    margin-right: 8px;

    &.arrow {
      height: 15px;
      margin: 0;
    }
  }

  &:hover {
    transition: 0.3s;
    border-color: var(--off-white);
  }

  &.router-link-exact-active {
    transition: 0.3s;
    background-color: var(--primary);
    color: white;

    &:hover {
      border-color: transparent;
    }
  }
}
</style>
