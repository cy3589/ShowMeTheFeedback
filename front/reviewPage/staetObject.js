export let stateObject;
export const setStateObject = (JSONdata) => {
  stateObject = JSON.parse(JSON.stringify(JSONdata));
};
