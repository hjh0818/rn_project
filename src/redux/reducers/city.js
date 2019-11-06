// city处理函数
export default function cityFn(state = {city: 30}, action) {
  let city = state.city;
  switch (action.type) {
    case 'CHANGE': {
      return {
        city,
      };
    }
    default:
      return state;
  }
}
