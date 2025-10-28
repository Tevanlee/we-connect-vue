// Reusable API composable that can always be scaled
// to accept and work with extra params etc. when required
export const useApi = async ({
  baseUrl = import.meta.env.VITE_APP_BASE_URL,
  path = "",
  _method = "GET",
  _headers = { "Content-Type": "application/json" },
  payload = null,
} = {}) => {
  const requestOptions = {
    method: _method,
    headers: _headers,
    body: payload,
  };

  const res = await fetch(`${baseUrl}/${path}/`, requestOptions);
  const data = await res.json();

  if (!data.success) return;

  return data;
};
