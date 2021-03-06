import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';

import Movie from '../pages/Movie/index';
import Cinema from '../pages/Cinema/index';
import Mine from '../pages/Mine/index';
import Icon from '../components/Icon.js';
import Detail from '../pages/Movie/components/detail.js';
import DownLoad from '../pages/Movie/components/downLoad.js';
import LocalCity from '../pages/Movie/components/localCity.js';
import SearchMovie from '../pages/Movie/components/searchMovie.js';

// 创建底部路由
const BaseRouter = createBottomTabNavigator(
  {
    Movie: {
      screen: Movie,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => <Icon name="movie" color={tintColor} />,
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
    initialRouteName: 'Movie',
    tabBarOptions: {
      activeTintColor: '#f03d37',
      inactiveTintColor: '#696969',
    },
  },
);
// 创建跳转路由;
const SketchRouter = createStackNavigator(
  {
    BaseNavigator: {
      screen: BaseRouter,
      navigationOptions: {
        header: null,
      },
    },
    Detail,
    DownLoad,
    LocalCity,
    SearchMovie,
  },

  {
    headerBackTitleVisible: false,
  },
);

export default createAppContainer(SketchRouter);
