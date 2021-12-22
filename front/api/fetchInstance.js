const baseURL =
  "http://elice-kdt-sw-1st-vm05.koreacentral.cloudapp.azure.com:5000";

export async function fetchInstance(path, params, method) {
  const config = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  };

  const response = await fetch(`${baseURL}${path}`, config);
  const status = await response.status;
  const data = await response.json();
  return { data, status };
}
