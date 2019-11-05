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
  SectionList,
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
      movieList: [], //已上映电影列表
      movieIds: [], //最新电影列表id
      getMore: true, //是否请求更多最新电影列表
      showTitle: 'hit', //显示正在热映/即将上映
      showHeader: true, //是否显示打开猫眼App
      comingMovieList: [], //即将上映电影列表
      comingMovieIds: [], //即将上映电影列表ID
      expectedMovieList: [], //即将上映受期待电影列表
      offset: 0, //第几次受期待电影 10备注
      total: 0, //受期待电影数量
      hasMore: true, //是否还有受期待电影数量
    };
  }
  componentWillMount() {
    this.state.showTitle === 'hit'
      ? this.getMovieListAction()
      : this.getComingAndExpectedList();
  }
  // 获取已上映电影列表数据
  async getMovieListAction() {
    const res = await MovieAPI.getMovieOnInfoList({token: ''});
    this.setState({
      movieList: res.movieList,
      movieIds: res.movieIds,
    });
  }
  // 获取即将上映电影
  getComingAndExpectedList() {
    this.getComingList();
    this.getMostExpectedList();
  }
  // 获取即将上映受期待电影列表数据
  async getMostExpectedList() {
    const {coming, paging} = await MovieAPI.getMostExpectedList({
      ci: 30,
      limit: 10,
      offset: 0,
      token: '',
    });
    this.setState({
      expectedMovieList: coming,
      offset: paging.offset,
      total: paging.total,
    });
  }
  // 获取即将上映电影列表数据
  async getComingList() {
    const {coming, movieIds} = await MovieAPI.getComingList({
      ci: 30,
      token: '',
      limit: 10,
    });
    let list = [];
    // 数据格式化处理
    coming.forEach(item => {
      if (list.length) {
        for (let i = 0; i < list.length; i++) {
          if (list[i].title === item.comingTitle) {
            list[i].data.push(item);
            return;
          } else if (i === list.length - 1) {
            list.push({
              title: item.comingTitle,
              data: [item],
            });
          }
        }
      } else if (list.length === 0) {
        list.push({
          title: item.comingTitle,
          data: [item],
        });
      }
    });
    this.setState({
      comingMovieList: list,
      comingMovieIds: movieIds,
    });
  }
  render() {
    const {
      movieList,
      showTitle,
      showHeader,
      comingMovieList,
      expectedMovieList,
    } = this.state;
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
                  this.setState(
                    {
                      showTitle: 'release',
                    },
                    this.getComingAndExpectedList,
                  )
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
            <ScrollView
              onScroll={this.scrollHitAction.bind(this)}
              showsVerticalScrollIndicator={false}>
              <FlatList
                data={movieList}
                showsHorizontalScrollIndicator={false}
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
                              <Text style={styles.pointLeft}>人想看</Text>
                            </View>
                          )}
                          <Text
                            style={styles.showInfo}
                            numberOfLines={1}
                            ellipsizeMode="tail">
                            主演：{item.star}
                          </Text>
                          <Text style={styles.showInfo} numberOfLines={1}>
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
              <ScrollView
                onScroll={this.scrollComingAction.bind(this)}
                showsVerticalScrollIndicator={false}>
                <View style={styles.releaseTop}>
                  <Text style={styles.topTitle}>近期最受期待</Text>
                  <ScrollView
                    onScroll={this.scrollExpectedAction.bind(this)}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}>
                    <FlatList
                      data={expectedMovieList}
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                      renderItem={({item}) => (
                        <TouchableOpacity
                          activeOpacity={1}
                          onPress={() =>
                            this.props.navigation.navigate('Detail', {
                              movieMsg: item,
                            })
                          }>
                          <View style={styles.releaseListItem}>
                            <View style={styles.imageBox}>
                              <Image
                                source={{
                                  uri: item.img.replace('/w.h', ''),
                                }}
                                style={styles.releaseItemImage}
                              />
                              <View style={styles.iconBox}>
                                <ImageBackground
                                  style={styles.wishIcon}
                                  source={{
                                    uri:
                                      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAoCAYAAACFFRgXAAAABGdBTUEAALGPC/xhBQAAAytJREFUWAnVmLtrFFEUh3cWFAtRE5FEEUREsFAkooUIgl3+CUEU7LVR1LBIMERCLFLZRG1CrFJYpLBQENRGC4n4wBeKRUQ2PlAQX+v3m70z7MzemZ3HZp05cPbce86553w7O7Mzc51KjDQaDYfwDvSAseux69Cv6Ef0LXoHXXAc5y82UqhVJbgLPYhuQTega9DPaB19ht6VpVYDaxUBWYUGewkcQzdbE4LOJabXaHQ76G7OqHWI0RG0v+mJ/XxPdJpaD2xZbcAUX0XiSXS/bUEH3yPil2imL1Chln6RE+huzVPKffJV60frugAwDfoI1tBtrUkpx4vknzVrLmAHU65vTX/F5DzQnzynDwzsCpwX0e1eMIfV+S3ReZpXXlDgFNC/VEgXgifHGXQDVvUE2g1Y1RKT2FxxgTm6cg4bXxHNsGH0j/DhIlKGmFzGKuSbCAyFgkWcDsG6UaeE/m/LIvsEvKcstGIV8ECJgAcErJtFWaRPwCvLQitWAbv3/ZJALwlYj3ZlkbqA9YBRFnkp4HtloRWrgJ+g/uNbgeHF+LTKY5tebWYLDOqhzYpVR1hyE33njor5ITYxNp/WIP/DeBINvI4ooQAipknD6D9eVnC8JjCOxr799vgLiGXcsLmtvVPCnRB4yGDanRTjQ2/PYvIlACwvCTcwM37G/xvMGJYAQRuwoiRex8wFMns7mTMMbV2twMpiwVXMfNuK5XfMm97WTpHAJvsy9pZ15fI41Us9IyUWmG+qPa4ptBe3b/WYMj2zAWsVBfQfPYEGrlbFuiiqPWF6xZaNPcLeSgr9ZjyGLni+LlrVHDM9OpZNBKwqFPyJGUWfa94lUa1RUztRSX9vLVE2SewNrMboaG9NuiYi7w3+M8B+i4hb3amBVQXotRjdxpPsHWtJWLQHfBrYL+FAp3kmYBUFWnu/2u1Mu03wgTXajaxjU0tmYHUCehAj6H7NE4ggBSvoTJL4orNVp/Eifm1eJ/lplXMuD6wYcgGrAAA6H0fQ75pHiGIjJjciJZk7N7DaAKIrvobarnj5aiaHYT7JdQ6HW5sL8Sj+nSb2GHsF2EwXWLi+5v8ArR6xIZ+h44wAAAAASUVORK5CYII=',
                                  }}
                                />
                              </View>
                              <Text style={styles.wantWish}>
                                {item.wish}人想看
                              </Text>
                            </View>
                            <Text style={styles.releaseItemName}>
                              {item.nm}
                            </Text>
                            <Text style={styles.releaseItemDate}>
                              {item.comingTitle.split(/\s+/)[0]}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      )}
                      keyExtractor={item => item.id}
                    />
                  </ScrollView>
                </View>
                <View style={styles.releaseBottom}>
                  <SectionList
                    //1数据的获取和渲染
                    sections={comingMovieList} //分类列表的数据源data
                    renderItem={({item}) => (
                      <TouchableOpacity
                        activeOpacity={1}
                        onPress={() =>
                          this.props.navigation.navigate('Detail', {
                            movieMsg: item,
                          })
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
                                  <Text style={styles.pointRight}>
                                    {item.sc}
                                  </Text>
                                </View>
                              ) : (
                                <View style={styles.flex}>
                                  <Text style={styles.wishLeft}>
                                    {item.wish}
                                  </Text>
                                  <Text style={styles.pointLeft}>人想看</Text>
                                </View>
                              )}
                              <Text
                                style={styles.showInfo}
                                numberOfLines={1}
                                ellipsizeMode="tail">
                                主演：{item.star}
                              </Text>
                              <Text style={styles.showInfo} numberOfLines={1}>
                                {item.rt + '上映'}
                              </Text>
                            </View>
                            <View style={styles.btnBox}>
                              {item.showst === 4 ? (
                                <Text style={styles.advanceBtn}>预售</Text>
                              ) : (
                                <Text style={[styles.buyBtn, styles.wantLook]}>
                                  想看
                                </Text>
                              )}
                            </View>
                          </View>
                        </View>
                      </TouchableOpacity>
                    )}
                    //2渲染分类标题(从数据源中解构出section)
                    renderSectionHeader={({section}) => (
                      <View style={styles.sectionListHeader}>
                        <Text>{section.title}</Text>
                      </View>
                    )}
                  />
                </View>
              </ScrollView>
            </View>
          )}
        </View>
      </SafeAreaView>
    );
  }
  // 正在热映的列表滚动事件
  scrollHitAction(event) {
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
  // 获取更多上映电影列表数据
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
  // 即将上映的列表滚动事件
  scrollComingAction(event) {
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
        this.getMoreWillComingList,
      );
    }
  }
  // 获取更多即将电影列表数据
  async getMoreWillComingList() {
    const {comingMovieList, comingMovieIds} = this.state;
    let idsList = [];
    const idList = comingMovieIds.slice(
      comingMovieIds.indexOf(
        comingMovieList[comingMovieList.length - 1].data[
          comingMovieList[comingMovieList.length - 1].data.length - 1
        ].id,
      ) + 1,
    );
    // 大于11条，则一次请求11条
    if (idList.length > 11) {
      idsList = idList.slice(0, 11);
    } else {
      idsList = idList;
    }
    const {coming} = await MovieAPI.getMoreComingList({
      ci: 30,
      token: '',
      limit: 10,
      movieIds: idsList,
    });
    let list = [];
    // 数据格式化处理
    coming.forEach(item => {
      if (list.length) {
        for (let i = 0; i < list.length; i++) {
          if (list[i].title === item.comingTitle) {
            list[i].data.push(item);
            return;
          } else if (i === list.length - 1) {
            list.push({
              title: item.comingTitle,
              data: [item],
            });
          }
        }
      } else if (list.length === 0) {
        list.push({
          title: item.comingTitle,
          data: [item],
        });
      }
    });
    this.setState({
      comingMovieList: comingMovieList.concat(list),
      getMore: true,
    });
  }
  // 受欢迎即将上映的列表滚动事件
  scrollExpectedAction(event) {
    const offsetX = event.nativeEvent.contentOffset.x; //滑动距离
    const {expectedMovieList, getMore, hasMore} = this.state;
    console.log(offsetX);
    if (offsetX > (expectedMovieList.length - 5) * 100 && getMore && hasMore) {
      this.setState(
        {
          getMore: false,
        },
        this.getMoreExpectedList,
      );
    }
  }
  // 获取更多受欢迎的电影
  async getMoreExpectedList() {
    const {offset, expectedMovieList} = this.state;
    const {coming, paging} = await MovieAPI.getMostExpected({
      ci: 30,
      limit: 10,
      offset: offset + 10,
      token: '',
    });
    this.setState({
      expectedMovieList: expectedMovieList.concat(coming),
      offset: paging.offset,
      total: paging.total,
      hasMore: paging.hasMore,
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
  releaseTop: {
    paddingLeft: 12,
    paddingRight: 12,
    paddingBottom: 12,
  },
  topTitle: {
    fontSize: 12,
    lineHeight: 38,
    color: '#333',
  },
  releaseListItem: {
    display: 'flex',
    marginRight: 10,
  },
  imageBox: {
    position: 'relative',
  },
  iconBox: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0,
    width: 28,
    height: 28,
    lineHeight: 28,
    borderBottomRightRadius: 10,
    backgroundColor: '#777',
    opacity: 0.7,
  },
  wishIcon: {
    width: 14,
    height: 13,
    backgroundColor: '#777',
  },
  releaseItemImage: {
    width: 85,
    height: 115,
  },
  wantWish: {
    position: 'absolute',
    left: 4,
    bottom: 2,
    color: '#faaf00',
    fontSize: 11,
    fontWeight: '600',
  },
  releaseItemName: {
    fontSize: 13,
    color: '#222',
    marginBottom: 3,
    marginTop: 5,
  },
  releaseItemDate: {
    fontSize: 12,
    color: '#999',
  },
  releaseBottom: {
    paddingRight: 12,
    borderTopWidth: 10,
    borderColor: '#f5f5f5',
  },
  wantLook: {
    backgroundColor: '#faaf00',
  },
  sectionListHeader: {
    paddingLeft: 12,
    paddingTop: 15,
    fontSize: 14,
    color: '#333',
  },
});
