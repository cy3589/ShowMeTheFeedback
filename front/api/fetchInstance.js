const baseURL =
  "http://elice-kdt-sw-1st-vm05.koreacentral.cloudapp.azure.com:5000";

/**
 * instance화 임시중지(24일 리팩토링시 다시 시도)
 *
 * @param {*} path : {baseURL}/path
 * @param {*} params : {headers, body}
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
    body: JSON.stringify(params.body),
  };
  // if (params.body !== undefined) {
  //   config.body = SON.stringify(params.body);
  // }

  console.log(config);
  const response = await fetch(`${baseURL}${path}`, config);
  const data = await response.json();
  const status = response.status;
  console.log(data, status);
  return { data, status };
}
