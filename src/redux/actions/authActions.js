export function setData(data) {
  return {
    type: '@auth/SET_DATA',
    payload: {data},
  };
}
export function setFlipData(data, index) {
  return {
    type: '@auth/SET_FLIP_DATA',
    payload: {data, index},
  };
}
export function setCorrectData(data, index1, index2) {
  return {
    type: '@auth/SET_CORRECT_DATA',
    payload: {data, index1, index2},
  };
}
