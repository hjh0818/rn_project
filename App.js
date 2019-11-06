import React, {Component} from 'react';
import SketchRouter from './src/routes/index';
import {Provider} from 'react-redux';
import configureStore from './src/redux/store/index.js';
const store = configureStore();

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <SketchRouter />
      </Provider>
    );
  }
}
