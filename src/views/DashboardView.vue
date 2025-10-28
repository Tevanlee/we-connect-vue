<template>
  <DashboardLayout>
    <div class="header flex align-center justify-between">
      <h2>User Management</h2>
      <div class="toggle-view align-center">
        <icon-mage-dash-menu
          class="icon-toggle"
          :class="{ ['active']: !gridViewState }"
          @click="gridViewState = false"
        />
        <icon-mage-dashboard
          class="icon-toggle"
          :class="{ ['active']: gridViewState }"
          @click="gridViewState = true"
        />
      </div>
    </div>
    <div class="users-wrapper" v-if="Object.keys(users).length > 0">
      <div class="user-list grid-view" v-if="gridViewState">
        <div class="user" v-for="user in users" :key="user.id">
          <div
            class="info"
            v-for="(value, key) in user"
            :key="key"
            :class="key"
          >
            <div v-if="key === 'name'">
              <p>{{ user[key] }}</p>
            </div>
            <div class="flex align-center" v-if="key === 'email'">
              <icon-line-md-email />
              <a :href="`mailto:${value}`">
                {{ value }}
              </a>
            </div>
            <div class="flex align-center" v-if="key === 'phone'">
              <icon-line-md-cellphone />
              <a :href="`tel:${value}`">{{ value }}</a>
            </div>
            <div v-if="key === 'message'">
              {{ value }}
            </div>
          </div>
        </div>
      </div>
      <div class="user-list list-view" v-else>
        <div class="list-header flex align-center">
          <div
            class="head-cell"
            v-for="(label, index) in userLabels"
            :key="index"
            :class="label"
          >
            <p>
              {{ label }}
            </p>
          </div>
        </div>
        <div
          class="list-item flex align-center"
          v-for="user in users"
          :key="user.id"
        >
          <div class="item-cell">
            {{ user.name }}
          </div>
          <div class="item-cell flex align-center">
            <a :href="`mailto:${user.email}`">
              {{ user.email }}
            </a>
          </div>
          <div class="item-cell flex align-center">
            <a :href="`tel:${user.phone}`">{{ user.phone }}</a>
          </div>
          <div class="item-cell message">
            {{ user.message }}
          </div>
        </div>
      </div>
    </div>
    <div class="users-empty" v-else>
      <p>No users found</p>
    </div>
  </DashboardLayout>
</template>

<script setup>
import DashboardLayout from "../components/Layouts/Dashboard.vue";

import { useUsers } from "../composables/useUsers";

const { users, userLabels, gridViewState } = useUsers();
</script>

<style lang="scss" scoped>
.header {
  .toggle-view {
    display: none;

    .icon-toggle {
      cursor: pointer;
      padding: 5px;
      margin-left: 10px;
      background-color: white;
      border-radius: 4px;
      color: var(--grey);
      transition: 0.3s;

      &:hover,
      &.active {
        transition: 0.2s;
        background-color: var(--primary);
        color: white;
      }
    }

    @media (min-width: 1200px) {
      display: flex;
    }
  }
}

.users-empty {
  box-sizing: border-box;
  margin-top: 20px;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 1px 2px var(--shadow);
  text-align: center;
  color: var(--grey);
}

.user-list {
  margin-top: 20px;

  &.grid-view {
    @media (min-width: 576px) {
      display: flex;
      flex-wrap: wrap;
      gap: 15px;
    }

    .user {
      box-sizing: border-box;
      background-color: white;
      padding: 15px;
      border-radius: 12px;
      box-shadow: 0 2px 4px var(--shadow);
      margin-bottom: 10px;

      @media (min-width: 576px) {
        margin-bottom: 0;
        width: calc(50% - 7.5px);

        @media (min-width: 1200px) {
          width: calc(33% - 7.5px);

          @media (min-width: 1920px) {
            width: calc(25% - 12px);

            @media (min-width: 2048px) {
              width: calc(20% - 12px);
            }
          }
        }
      }

      &:nth-last-child(1) {
        margin-bottom: 0;
      }

      .id {
        display: none;
      }

      .info {
        &.name {
          margin-bottom: 10px;
          padding-bottom: 10px;
          border-bottom: 1px solid var(--off-white);
          p {
            font-size: 18px;
            color: var(--primary);
          }
        }

        &.phone,
        &.email {
          color: var(--grey);
          margin-bottom: 5px;

          svg {
            margin-right: 5px;
          }
        }

        &.message {
          box-sizing: border-box;
          padding: 15px 20px;
          border-radius: 8px;
          background-color: var(--off-white);
          margin-top: 20px;
        }

        &:nth-last-child(1) {
          margin-bottom: 0;
        }
      }
    }
  }

  &.list-view {
    display: none;

    @media (min-width: 1200px) {
      display: block;
      box-sizing: border-box;
      padding: 10px;
      border-radius: 10px;
      box-shadow: 0 1px 2px var(--shadow);
      background-color: white;

      .list-header {
        box-sizing: border-box;
        padding: 15px;
        border-radius: 6px;
        background-color: var(--off-white);

        .head-cell {
          text-transform: capitalize;
          flex: 1;

          &.id {
            display: none;
          }
        }
      }

      .list-item {
        box-sizing: border-box;
        padding: 10px;
        border-bottom: 1px solid var(--off-white);

        &:nth-last-child(1) {
          border: none;
          padding-bottom: 0;
        }

        .item-cell {
          flex: 1;
          font-size: 15px;
          color: var(--grey);
          padding-left: 5px;

          svg {
            margin-right: 5px;
          }

          &.message {
            font-size: 12px;
            padding: 10px;
            border-radius: 6px;
            border: 1px solid var(--off-white);
          }
        }
      }
    }
  }
}
</style>
