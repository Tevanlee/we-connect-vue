import { onMounted, onUnmounted, ref, reactive, computed } from "vue";
import { useApi } from "../api";
export const useUsers = () => {
  const userData = reactive({
    name: null,
    email: null,
    phone: null,
    message: null,
  });
  const users = ref([]);
  const userLabels = ref([]);
  const loading = ref(false);
  const errors = ref(null);
  const success = ref(null);
  const msgTimeout = ref(null);
  const gridViewState = ref(true);
  const screenWidth = ref(window.innerWidth);

  const phoneMaxLength = computed(() =>
    String(userData.phone).startsWith("+27") ? 12 : 10
  );

  const setMessage = (msg, time, error = true) => {
    if (error) {
      errors.value = msg;
    } else {
      success.value = msg;
    }

    if (msgTimeout.value) clearInterval(msgTimeout);

    msgTimeout.value = setTimeout(() => {
      errors.value = null;
      success.value = null;
    }, time);
  };

  const getUsers = async () => {
    loading.value = true;

    const res = await useApi({ path: "users" });

    if (!res.success) {
      setMessage(data.error, 3000);
      loading.value = false;
      return;
    }

    const { data } = res;

    users.value = data;

    loading.value = false;
  };

  // Here we are retriving the user data keys to use as table headers
  const getUserKeys = () => {
    if (Object.keys(users.value).length === 0) return;

    const [fisrtRecord] = users.value;
    userLabels.value = Object.keys(fisrtRecord);
  };

  const checkEmailInputFormat = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
      userData.email = null;
      setMessage("Invalid email address", 3000);
    }
  };

  const phoneInputAllowedKeys = (countryCode = "+27") => {
    userData.phone = userData.phone.replace(/[^\d+]/g, "");
    userData.phone = userData.phone.replace(/(?!^)\+/g, "");
  };

  const resetUserData = () => {
    userData.name = null;
    userData.email = null;
    userData.phone = null;
    userData.message = null;
  };

  const createUser = async () => {
    loading.value = true;

    const { data } = await useApi({
      path: "users/create.php",
      _method: "POST",
      payload: JSON.stringify(userData),
    });

    const { success, error, message } = data;

    if (!success) {
      setMessage(error, 5000);
      loading.value = false;
      return;
    }

    resetUserData();
    setMessage(message, 5000, false);
    loading.value = false;
  };

  const setView = () => {
    screenWidth.value = window.innerWidth;

    if (screenWidth.value <= 1200) {
      gridViewState.value = true;
    } else {
      gridViewState.value = false;
    }
  };

  setView();

  onMounted(async () => {
    await getUsers();
    getUserKeys();

    window.addEventListener("resize", setView);
  });

  onUnmounted(() => {
    window.addEventListener("resize", setView);
  });

  return {
    userData,
    users,
    errors,
    success,
    userLabels,
    loading,
    gridViewState,
    phoneMaxLength,
    createUser,
    checkEmailInputFormat,
    phoneInputAllowedKeys,
  };
};
