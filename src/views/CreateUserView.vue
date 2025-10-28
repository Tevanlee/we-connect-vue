<template>
  <DashboardLayout align-content="center">
    <div class="form-wrapper">
      <div class="header">
        <h2>Create User</h2>
      </div>
      <form @submit.prevent>
        <div class="input-group">
          <label for="name">Name</label>
          <input
            id="name"
            type="text"
            placeholder="Enter your full name"
            v-model="userData.name"
          />
        </div>
        <div class="input-group">
          <label for="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email address"
            v-model="userData.email"
            @blur="checkEmailInputFormat"
          />
        </div>
        <div class="input-group">
          <label for="phone">Phone</label>
          <input
            id="phone"
            type="text"
            placeholder="Enter your phone number"
            v-model="userData.phone"
            @input="phoneInputAllowedKeys"
            :maxlength="phoneMaxLength"
          />
        </div>
        <div class="input-group">
          <label for="message">Message</label>
          <textarea
            id="message"
            placeholder="Enter a message"
            v-model="userData.message"
          ></textarea>
        </div>
        <div class="button-wrapper">
          <button class="primary-btn" @click="createUser">Proceed</button>
        </div>
      </form>
      <NotificationCard :message="errors" :error="true" />
      <NotificationCard :message="success" />
    </div>
  </DashboardLayout>
</template>

<script setup>
import DashboardLayout from "../components/Layouts/Dashboard.vue";
import NotificationCard from "../components/NotificationCard.vue";

import { useUsers } from "../composables/useUsers";

const {
  createUser,
  phoneInputAllowedKeys,
  checkEmailInputFormat,
  errors,
  success,
  userData,
  phoneMaxLength,
} = useUsers();
</script>

<style lang="scss" scoped>
.form-wrapper {
  position: relative;
  box-sizing: border-box;
  margin-top: 20px;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 1px 2px var(--shadow);
  background-color: white;
  width: 100%;

  @media (min-width: 992px) {
    max-width: 500px;
  }

  .header {
    box-sizing: border-box;
    padding: 10px;
    background-color: var(--off-white);
    border-radius: 8px;
    margin-bottom: 20px;
    text-align: center;
  }

  .input-group {
    margin-bottom: 20px;
  }
}

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
