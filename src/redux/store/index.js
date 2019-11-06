import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers/index';

// 添加中间件
const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);
// 创建store
export default function configureStore(initialState) {
  const store = createStoreWithMiddleware(rootReducer, initialState);
  return store;
}
