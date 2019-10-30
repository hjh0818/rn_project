import React from 'react';
import {Text, Button, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-navigation';
// import MovieAPI from '../../api/movie.js';
import Header from '../../components/header.js';

export default class Movie extends React.Component {
  static navigationOptions = {
    title: '电影',
  };
  constructor(props) {
    super(props);
    this.state = {
      movieList: [],
    };
  }
  // componentDidMount() {
  //   this.getMovieListAction();
  // }
  // async getMovieListAction() {
  //   const res = await MovieAPI.getMovieOnInfoList({token: ''});
  //   this.setState({
  //     movieList: res.movieList,
  //   });
  // }
  render() {
    // const {movieList} = this.state;
    return (
      <SafeAreaView style={styles.contaner}>
        <View style={styles.contaner}>
          <Header name="猫眼电影" />
          <Text>111</Text>
          <Button
            title="点击跳转详情"
            onPress={() => this.props.navigation.navigate('Detail')}
          />
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  contaner: {
    backgroundColor: '#fff',
    flex: 1,
  },
  test: {
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0f0',
  },
});
