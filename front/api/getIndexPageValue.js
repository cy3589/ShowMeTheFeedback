const baseURL =
  "http://elice-kdt-sw-1st-vm05.koreacentral.cloudapp.azure.com:5000";

export async function getIndexPageValue() {
  const response = await fetch(`${baseURL}/api/home`, {
    method: "GET",
  });

  const data = await response.json();
  const status = response.status;
  return { data, status };
}
