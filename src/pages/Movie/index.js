import React from 'react';
import {
  ImageBackground,
  Text,
  StyleSheet,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
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
      movieList: [], //电影列表
      movieIds: [], //最新电影列表id
      getMore: true, //是否请求更多最新电影列表
      showTitle: 'hit', //显示正在热映/即将上映
      showHeader: true, //是否显示打开猫眼App
    };
  }
  componentDidMount() {
    this.getMovieListAction();
  }
  // 获取电影列表数据
  async getMovieListAction() {
    const res = await MovieAPI.getMovieOnInfoList({token: ''});
    this.setState({
      movieList: res.movieList,
      movieIds: res.movieIds,
    });
  }
  render() {
    const {movieList, showTitle, showHeader} = this.state;
    return (
      <SafeAreaView style={styles.contaner}>
        <View style={styles.contaner}>
          <Header name="猫眼电影" />
          {showHeader ? (
            <TouchableOpacity
              activeOpacity={1}
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
          ) : null}
          <View style={styles.showTitle}>
            <TouchableOpacity
              style={styles.localBox}
              activeOpacity={1}
              onPress={() => this.props.navigation.navigate('LocalCity')}>
              <Text style={styles.city}>深圳</Text>
              <Text style={styles.icon} />
            </TouchableOpacity>
            <View style={styles.showBox}>
              <Text
                style={[
                  styles.onHitRelease,
                  showTitle === 'hit' ? styles.active : '',
                ]}
                onPress={() =>
                  this.setState({
                    showTitle: 'hit',
                  })
                }>
                正在热映
              </Text>
              <Text
                style={[
                  styles.onHitRelease,
                  showTitle === 'release' ? styles.active : '',
                ]}
                onPress={() =>
                  this.setState({
                    showTitle: 'release',
                  })
                }>
                即将上映
              </Text>
            </View>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => this.props.navigation.navigate('SearchMovie')}>
              <ImageBackground
                style={styles.searchBtn}
                source={{
                  uri:
                    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAABC1JREFUWAntWEtrU1EQPpO+ArYm1Y1I3VRXgu5EoSpVQaxCxUVxYTeCv8CtoFVxW0F/gBsLiguxoBaxWHyLS0EEdWWobrRprZC+cpzv3NyTOfeR3DS3duOF5M6ZMzPflzmvOVHq/9NcBqhRdz001D43UziktR5k35382ao1bUUcIj3NL3w+EtH4xu6eZ3Tv3iL6VvskJjh/vH/Lcql0UZM6o7TamAiQ1BxpNdaazV7pfDT1I5FPwKguQT0w0FFcLF5QSp9nYhsC/smapP5wfkfz7flr9PjxQjInz6omQZO1hdJ9rdW+RoLG2RKpt60d2VONZDOW4PyRA7uX9NJDBuuJACzwhHuQ0ZmHPNe+dm1qxbxTv38t83zU28tUPqG0Phnn25ah451P33yIiBtSRRJE5pZKpfchAKJp0vpSbvO2Wzz5V0LRhIIXU8vsz29nNdFlJmsWkegutGWze5JkMkQQc252cWYqYljH850twzT+6rcAqivqwb6u4vzKbTbEqrcPhjvX3t1fb05mrEdFwIIIkSN1I3/w2KlGySEkfOCrVOamxAKGt/ikNiw7GTRDu1D6Elit44bcyEg57J5co0dGMsXnE/fZo5pJXt1tHdkdtYbaySD2OYcczzkzrE2Sw88gjoFYvLjMgjI/jbctg2ka0V+WIE4IswkLOyyI1QyrCOGIiIWYUglMYEudlC1BHF+BE6KA1SqN05ArMQs2Fp9KBtsqXMESrJyt1V7e5+ptJVXj5JKJybGlRwhbdFqCrMPBbx9swraRshAR28GWcJKgs5nihJCGacoRsR1siWUJ+iWT3+kfX347zXcwdhBbYlmCUrkOso7DtAQrxaa1w8FvGykLwdiM/T0OwhJkg+oGyg1UJXFOzeojYjvYMr4k+FF2mJJJKlKUI2I72BLKEsQdQnagnkPJ5OhSaJiYXq1oo4WwbQ+XGL6MC47iO4Tf5ncP6jnRTkWsxKwWwYxpsGOiW4K4feGCI+1QbKKek7pmZMQyBawIAkxgC5UjWoLQ4vbFWeQLTuXhShjFJkolX7Xatym3ULjK6pqxDGaNoA6wV5fRaMB+sPhi4nozJL1a8IlbCxoQGq1VC8LEKVih+Icl/2cu+Xc1XPLDAVdD5loticCcK+Hin/Kn4uF955KsbtjAFj7wNRGcL+qdW5wFTs0nlEHfeg2vnT4EF9e0QoqGc5Ov71hlQIglCLs1uLh/5lnVyyeJ3V9Bkne7M/nJV3cD3EzTWSRBA0xgXA35p151VnfQsF4bOwPHwJwDGY+U5+SRLY8Vj/SdjgpTM4PSwWQzpT+PPDLlsSSZTEzQJ8uTP5W/35KSbJigTzSNdxxJamnpyz15+Q4YNedgGiRqxfAWRnhO6pWy3ZbWlSDIR5EkpV/4P2xdh9gngffs0f17kTmQy02+mZB9/+VmMvAXE7/38O8tTYkAAAAASUVORK5CYII=)',
                }}
              />
            </TouchableOpacity>
          </View>
          {showTitle === 'hit' ? (
            <ScrollView onScroll={this.scrollAction.bind(this)}>
              <FlatList
                data={movieList}
                renderItem={({item}) => (
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() =>
                      this.props.navigation.navigate('Detail', {movieMsg: item})
                    }>
                    <View style={styles.listItem}>
                      <Image
                        source={{
                          uri: item.img.replace('/w.h', ''),
                        }}
                        style={styles.itemImage}
                      />
                      <View style={styles.itemDetail}>
                        <View style={styles.detailLeft}>
                          <Text style={styles.itemName}>{item.nm}</Text>
                          {item.globalReleased ? (
                            <View style={styles.flex}>
                              <Text style={styles.pointLeft}>观众评</Text>
                              <Text style={styles.pointRight}>{item.sc}</Text>
                            </View>
                          ) : (
                            <View style={styles.flex}>
                              <Text style={styles.wishLeft}>{item.wish}</Text>
                              <Text style={styles.pointLeft}>想看</Text>
                            </View>
                          )}
                          <Text
                            style={styles.showInfo}
                            numberOfLines={1}
                            ellipsizeMode="tail">
                            主演：{item.star}
                          </Text>
                          <Text style={styles.showInfo} numberOfLines={18}>
                            {item.showInfo}
                          </Text>
                        </View>
                        <View style={styles.btnBox}>
                          {item.globalReleased ? (
                            <Text style={styles.buyBtn}>购票</Text>
                          ) : (
                            <Text style={styles.advanceBtn}>预售</Text>
                          )}
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
                keyExtractor={item => item.id}
              />
            </ScrollView>
          ) : (
            <View>
              <Text>即将上映</Text>
            </View>
          )}
        </View>
      </SafeAreaView>
    );
  }
  // 正在热映的列表滚动事件
  scrollAction(event) {
    const offsetY = event.nativeEvent.contentOffset.y; //滑动距离
    const {showHeader, movieList, getMore} = this.state;
    if (offsetY > 100 && showHeader) {
      this.setState({
        showHeader: false,
      });
    } else if (offsetY < 100 && !showHeader) {
      this.setState({
        showHeader: true,
      });
    }
    if (offsetY > (movieList.length - 5) * 114 && getMore) {
      this.setState(
        {
          getMore: false,
        },
        this.getMoreComingList,
      );
    }
  }
  // 获取电影列表数据
  async getMoreComingList() {
    const {movieList, movieIds} = this.state;
    let idsList = [];
    const list = movieIds.slice(
      movieIds.indexOf(movieList[movieList.length - 1].id) + 1,
    );
    // 大于11条，则一次请求11条
    if (list.length > 11) {
      idsList = list.slice(0, 11);
    } else {
      idsList = list;
    }
    const res = await MovieAPI.getMoreComingList({
      token: '',
      movieIds: idsList,
    });
    this.setState({
      movieList: movieList.concat(res.coming),
      getMore: true,
    });
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
  listItem: {
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 15,
  },
  itemImage: {
    width: 64,
    height: 90,
    marginTop: 12,
    marginRight: 10,
  },
  itemDetail: {
    paddingTop: 12,
    paddingBottom: 12,
    display: 'flex',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  detailLeft: {
    width: 230,
    paddingRight: 5,
  },
  itemName: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '700',
    paddingRight: 5,
    color: '#333',
    marginBottom: 7,
  },
  pointLeft: {
    fontSize: 13,
    color: '#666',
    lineHeight: 15,
  },
  pointRight: {
    fontWeight: '700',
    color: '#faaf00',
    fontSize: 15,
    lineHeight: 15,
    paddingLeft: 5,
  },
  wishLeft: {
    fontWeight: '700',
    color: '#faaf00',
    fontSize: 15,
    lineHeight: 15,
    paddingRight: 5,
  },
  flex: {
    display: 'flex',
    flexDirection: 'row',
  },
  showInfo: {
    fontSize: 13,
    color: '#666',
    marginTop: 6,
    lineHeight: 15,
  },
  btnBox: {
    display: 'flex',
    justifyContent: 'center',
  },
  buyBtn: {
    width: 47,
    textAlign: 'center',
    lineHeight: 28,
    borderRadius: 4,
    backgroundColor: '#f03d37',
    color: '#fff',
    fontSize: 12,
  },
  advanceBtn: {
    width: 47,
    textAlign: 'center',
    lineHeight: 28,
    borderRadius: 4,
    backgroundColor: '#3c9fe6',
    color: '#fff',
    fontSize: 12,
  },
  showTitle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#e6e6e6',
    paddingLeft: 15,
    paddingRight: 15,
    height: 44,
  },
  localBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  city: {
    fontSize: 15,
    color: '#666',
  },
  icon: {
    width: 0,
    height: 0,
    borderWidth: 4,
    borderTopColor: '#b0b0b0',
    borderStyle: 'solid',
    borderBottomColor: '#fff',
    borderLeftColor: '#fff',
    borderRightColor: '#fff',
    marginLeft: 4,
    marginTop: 5,
  },
  showBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  onHitRelease: {
    fontSize: 15,
    color: '#666',
    lineHeight: 44,
    textAlign: 'center',
    paddingLeft: 8,
    paddingRight: 8,
    marginLeft: 12,
    marginRight: 12,
    fontWeight: '700',
  },
  active: {
    color: '#ef4238',
    borderBottomWidth: 2,
    borderStyle: 'solid',
    borderColor: '#ef4238',
  },
  searchBtn: {
    width: 20,
    height: 20,
    marginTop: 11,
  },
});
