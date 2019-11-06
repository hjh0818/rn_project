// function saveData (data) {
//   return {
//     type: 'SVAE_DATA',
//     date: data
//   }
// }

// exports function getData () {
//   return async (dispatch) => {
//     const data = await get(`/api`)
//     if (result) {
//       await dispatch(saveData(data))
//     }
//   }
// }

// 修改count的预处理数据
export const change = {
  type: 'CHANGE',
};
