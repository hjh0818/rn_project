import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
// import {createStackNavigator} from 'react-navigation-stack';

import Home from '../pages/Home/index';
import Cinema from '../pages/Cinema/index';
import Mine from '../pages/Mine/index';
import Icon from '../components/Icon.js';
import TabBar from '../components/TabBar.js';

// 创建底部路由
const SketchRouter = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => <Icon name="home" color={tintColor} />,
      },
    },
    Cinema: {
      screen: Cinema,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => <Icon name="cinema" color={tintColor} />,
      },
    },
    Mine: {
      screen: Mine,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => <Icon name="mine" color={tintColor} />,
      },
    },
  },
  {
    initialRouteName: 'Home',
    // tabBarComponent: TabBar, //自定义tab组件
    tabBarOptions: {
      activeTintColor: '#f03d37',
      inactiveTintColor: '#696969',
    },
  },
);
// 创建跳转路由
// const SketchRouter = createStackNavigator(
//   {
//     Home,
//     Cinema,
//   },

//   {
//     headerBackTitleVisible: false,
//   },
// );

export default createAppContainer(SketchRouter);
