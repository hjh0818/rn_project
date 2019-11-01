import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import MovieAPI from '../../api/movie.js';
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
  componentDidMount() {
    this.getMovieListAction();
  }
  async getMovieListAction() {
    const res = await MovieAPI.getMovieOnInfoList({token: ''});
    this.setState({
      movieList: res.movieList,
    });
  }
  render() {
    const {movieList} = this.state;
    console.log(this.props);
    return (
      <SafeAreaView style={styles.contaner}>
        <View style={styles.contaner}>
          <Header name="猫眼电影" />
          <TouchableOpacity
            activeOpacity="1"
            onPress={() => this.props.navigation.navigate('DownLoad')}>
            <View style={styles.topBox}>
              <Image
                source={{
                  uri:
                    'http://s0.meituan.net/bs/?f=myfe/canary:/asgard/images/avatar.png',
                }}
                style={styles.imageIcon}
              />
              <View style={styles.topTips}>
                <Text style={styles.tipsTop}>猫眼</Text>
                <Text style={styles.tipsBottom}>
                  在线选座，热门影讯，爱上看电影
                </Text>
              </View>
              <Text style={styles.openBtn}>立即打开</Text>
            </View>
          </TouchableOpacity>
          <FlatList
            data={movieList}
            renderItem={({item}) => (
              <Text
                style={styles.movieItem}
                onPress={() =>
                  this.props.navigation.navigate('Detail', {
                    movieList,
                  })
                }>
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
  contaner: {
    backgroundColor: '#fff',
    flex: 1,
  },
  movieItem: {
    lineHeight: 20,
    backgroundColor: '#0078ff',
    marginTop: 5,
    textAlign: 'center',
  },
  topBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingRight: 14,
    paddingBottom: 10,
    paddingLeft: 14,
    height: 63,
    borderBottomWidth: 1,
    borderBottomColor: '#e6e6e6',
  },
  topTips: {
    width: 222,
    paddingTop: 2,
  },
  tipsTop: {
    color: '#222',
    fontSize: 17,
  },
  tipsBottom: {
    color: '#999',
    fontSize: 12,
  },
  openBtn: {
    width: 68,
    height: 30,
    lineHeight: 30,
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#ef4238',
    fontSize: 13,
    borderRadius: 3,
    marginTop: 7,
  },
  imageIcon: {
    width: 42,
    height: 42,
  },
});
