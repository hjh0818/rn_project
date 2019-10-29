import React from 'react';
import {Text, StyleSheet, StatusBar, View, FlatList} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import HomeAPI from '../../config/home.js';
export default class Home extends React.Component {
  static navigationOptions = {
    title: '电影',
  };
  constructor(props) {
    super(props);
    this.state = {
      movieList: [],
      total: 10,
    };
  }
  componentDidMount() {
    this.getMovieListAction();
  }
  async getMovieListAction() {
    const res = await HomeAPI.getMovieOnInfoList({token: ''});
    this.setState({
      movieList: res.movieList,
      total: res.total,
    });
  }
  render() {
    const {movieList} = this.state;
    return (
      <SafeAreaView style={styles.contaner}>
        <StatusBar barStyle="dark-content" />
        <View>
          <FlatList
            data={movieList}
            renderItem={({item}) => (
              <Text>
                {item.nm},{item.showInfo}
              </Text>
            )}
            keyExtractor={item => item.id}
          />
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  fontSizeType: {
    fontSize: 18,
  },
  contaner: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  test: {
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0f0',
  },
});
