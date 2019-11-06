import {combineReducers} from 'redux';
import counter from './counter';
import city from './city';

// 合并多个处理数据函数
const rootReducer = combineReducers({
  // key值为state对象中的key名称
  counter,
  city,
});

export default rootReducer;
