// count处理函数
export default function counter(state = {count: 0}, action) {
  let count = state.count;
  switch (action.type) {
    case 'ADD': {
      return {
        count: count + 1,
      };
    }
    case 'DECREASE': {
      return {
        count: count - 1,
      };
    }
    default:
      return state;
  }
}
