const baseURL =
  "http://elice-kdt-sw-1st-vm05.koreacentral.cloudapp.azure.com:5000";

/**
 *
 * @param {*} path : {baseURL}/path
 * @param {*} params : {header, body}
 * @param {*} method : GET/POST/DELETE
 * @returns : {response.data, response.status}
 */
export async function fetchInstance(path, params, method) {
  const config = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...params.headers,
    },
    ...params.body,
  };

  console.log(config);
  const response = await fetch(`${baseURL}${path}`, config);
  const data = await response.json();
  const status = response.status;
  console.log(data, status);
  return { data, status };
}
