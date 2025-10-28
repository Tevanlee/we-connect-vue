<template>
  <div
    class="message-card"
    :class="{
      ['active error']: message,
      ['error']: error,
      ['success']: !error,
    }"
  >
    <span> {{ message }} </span>
  </div>
</template>

<script setup>
defineProps({
  message: {
    type: String,
    default: "",
  },
  error: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" scoped>
.message-card {
  box-sizing: border-box;
  position: absolute;
  width: calc(100% - 40px);
  bottom: 15px;
  right: 15px;
  padding: 10px 15px;
  border-radius: 8px;
  color: var(--grey);
  background-color: var(--light-grey);
  box-shadow: 0 2px 4px var(--shadow);
  font-size: 13px;
  font-weight: 300;
  z-index: 9;
  transition: 0.3s;
  transform: scale(0);
  opacity: 0;
  visibility: hidden;

  &.error {
    color: var(--error-text);
    background-color: var(--error-bkg);
  }

  &.success {
    color: var(--success-text);
    background-color: var(--success-bkg);
  }

  &.active {
    transition: 0.3s;
    opacity: 1;
    visibility: visible;
    transform: scale(1);
  }

  @media (min-width: 576px) {
    width: max-content;
  }
}
</style>
