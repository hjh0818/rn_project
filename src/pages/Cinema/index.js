import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import Header from '../../components/header.js';
import cinemaAPI from '../../api/cinema.js';
import {connect} from 'react-redux';

class Cinema extends React.Component {
  static navigationOptions = {
    // 设置 title
    title: '影院',
  };
  constructor(props) {
    super(props);
    this.state = {
      cinameList: [], //影院列表
      hasMore: true, //是否还有更多影院列表
    };
  }
  componentWillMount() {
    this.getCinemaList();
  }
  async getCinemaList() {
    const res = await cinemaAPI.getCinemaList({
      day: '',
      offset: 0,
      limit: 20,
      cityId: this.props.city,
    });
    console.log(res);
    this.setState({
      cinameList: res.cinemas,
      hasMore: res.paging.hasMore,
    });
  }
  render() {
    const {cinameList} = this.state;
    return (
      <SafeAreaView style={styles.contaner}>
        <View>
          <Header name="影院" />
          <View style={styles.searchBox}>
            <TouchableOpacity
              style={styles.cityBox}
              activeOpacity={1}
              onPress={() => this.props.navigation.navigate('LocalCity')}>
              <Text style={styles.city} numberOfLines={1}>
                深圳
              </Text>
              <Text style={styles.cityIcon} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.searchBtn}
              activeOpacity={1}
              onPress={() => this.props.navigation.navigate('LocalCity')}>
              <ImageBackground
                source={{
                  uri:
                    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAwFJREFUSA3FVs1qU0EUTibBRQiCRF3UB3BTcFHwJ0XRJ+gDhDaQ5vcJ3PgCfYL80AYSyQP4BIKQiosuhLoQXOjCbqQIJUgoyY3fdzNnmCRzk3uvBQfmzrlzzvm+OTNzz7mJxH9qyTC83W733mQyeTKbzbbQc8lk8hL9Ip1OfyqVSr/CYCzbBBKDQHU6nX2MZfQ8HNWyM949LOAU/bharb7F6DlsnFNOYhDmp9NpGx7bTi/35HkqlaphAadu9eLsCjFIS57nNRHlLct0AnmIiL5ivETPQf8Q4y56Gt1v0F8rpRog78pc0LhATFJEemIZXwHoKJvNNguFwm9r3hcHg8Gd0WjUwEJfY+K26BH54SZyQ8ztBcB7K9IzAO01Go2fAhg0NpvNB9C9Q9+hjY781bpt9y8MyBTP1CZFpC/CkJKIdrSHyMUmiKPxXBeSJvOb2mq1DiDLRbqCvFer1f7QIGzT9nuwpz/bNnZxfy6uPv0VYWvKouKZho1UfGTUkR/JOyI3uDIno2JygMEzPTHhRRJlnFH78yvglueJ78JRzEhQyFkMXbfX5Rg0p/2HWi/4K+YKq9qSWf2dymvs0cax8W1AEuesCSaHm2gGZwnfYCuszhhh1l6EMYohGJwlfANF4gt5w+qYBv+52Tg2vg2sWNowIVVll2nQNogqa3/mcDZP48/frKdiPcWqpKKkmXstfWRR+/uFg7hB9VpSpikMTPg690YmpR/834gjiI9FXh79IoEzUUibn6GUtHnG3Bslbbbb7QxIfwDjriY5r9frj0Aux7jALSnTYxGH0bXW7gDkQ9jIdaRfLFLCfEefUXA1UxapvKl6bBF1EXUZAa0sYIFYyBFt7D8QHBu/kuebyFeINXnsf65KpfIR94WXqrSO3ElMB33hDrBNh5DX/mVCf4It7ctFwntyE3kgsbXaRL/fvz8ejx8DMPR/9SbyUMT2IqLIa8mjAMWxdZB/y2QyT80/cRzQMD78lNDKOHOa84fwZbFYtCtiGJj4Noy81+uZcvkXH+aXwmK6+EsAAAAASUVORK5CYII=',
                }}
                style={styles.searchIcon}
              />
              <Text style={styles.searchTitle}>搜影院</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.filterBox}>
            <View style={styles.filterItem}>
              <Text style={styles.itemTitle}>全城</Text>
              <Text style={[styles.cityIcon, styles.filterIcon]} />
            </View>
            <View style={styles.filterItem}>
              <Text style={styles.itemTitle}>品牌</Text>
              <Text style={[styles.cityIcon, styles.filterIcon]} />
            </View>
            <View style={[styles.filterItem, styles.boderNone]}>
              <Text style={styles.itemTitle}>特色</Text>
              <Text style={[styles.cityIcon, styles.filterIcon]} />
            </View>
          </View>
          <FlatList
            data={cinameList}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.cinameItem}
                onPress={() => this.props.navigation.navigate('Detail')}>
                <View style={styles.cinameTop}>
                  <Text style={styles.cinameName}>{item.nm}</Text>
                  <Text style={styles.sellPrice}>{item.sellPrice}起</Text>
                </View>
                <View style={styles.cinameMiddle}>
                  <Text numberOfLines={1} style={styles.cinameAddr}>
                    {item.addr}
                  </Text>
                  <Text style={styles.distance}>{item.distance}</Text>
                </View>
                {item.promotion.cardPromotionTag ? (
                  <View style={styles.cardItem}>
                    <ImageBackground
                      source={{
                        uri:
                          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAeCAYAAABNChwpAAAAAXNSR0IArs4c6QAAAgFJREFUSA3Nlz1LA0EQhmf3kouFEQwi+FEYQ+xEsImFoCDoL/CLaKd/QbC0sbCzFVuxsRS1jEVAsUqrIILRQAhaBGKMuawzwpGAm83mNhddCHfZnd3n3Z2ZuxsG2JI3YtQpVw6AiTkhYJj6/GqMwSsIdm312DsnMyzLCF79rGRAiIhfUOm6jL0FQvZU4Gfn0GU4KcINE5vjsc9LFXajE9kcfT7UDZaMQWwuG9Dpi/YyiIWZjqnSxrOAtWgANsYDysV1Bj0L0Flcx8ZoC1F0wf50UMo5fqjCY1FIxxo7jQSUHWgK+ag2YprfGwnIlQTQTk3a/46B2UEOIUu+v0gIIMgZLLTIZHJTOl+TL4K9ShckMc36Q+pc356QB6FLLJQFCqi4f39d2WoKLTy03ckg2OjAvcyXh9n1KX8eA0YC4n0MtuLoJru+o3bvjAS8o2vpfXCYsGEzZkFYHQ5SbcoglM5o6KQAoxhIDHBYiVqYERZcZB04f3aghNGv04wEuIDbQg3u8Lc4YsHymAVLeD17cuDypbWKjgggIZTpVwhM5x1YxzdlpaaXXB0T4J5GEbPy6F7/8WwUhC7U5OpZgIPfU5qnrNTn+UmoXLWNQc8n0AZDacqxUskpLXwcJDbHMinlI0O9NLI51WiAZZLa0odRZBKbU4FINRoDdtoNdxCDWMQk9jePWpE8hVOLbwAAAABJRU5ErkJggg==',
                      }}
                      style={styles.cardIcon}
                    />
                    <Text style={styles.cardPromotionTag}>
                      {item.promotion.cardPromotionTag}
                    </Text>
                  </View>
                ) : null}
                {item.tag ? (
                  <View style={styles.tagItem}>
                    {item.tag.allowRefund === 1 ? (
                      <Text style={styles.refund}>退</Text>
                    ) : null}
                    {item.tag.endorse === 1 ? (
                      <Text style={styles.refund}>改签</Text>
                    ) : null}
                    {item.tag.snack === 1 ? (
                      <Text style={styles.snack}>小吃</Text>
                    ) : null}
                    {item.tag.vipTag ? (
                      <Text style={styles.snack}>{item.tag.vipTag}</Text>
                    ) : null}
                    {item.tag.hallType ? (
                      <FlatList
                        data={item.tag.hallType}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({type}) => (
                          <Text style={styles.refund}>{type}</Text>
                        )}
                        keyExtractor={(type, index) => index}
                      />
                    ) : null}
                  </View>
                ) : null}
                <Text />
              </TouchableOpacity>
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
    backgroundColor: '#f5f5f5',
    flex: 1,
  },
  test: {
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f00',
  },
  searchBox: {
    backgroundColor: '#f5f5f5',
    paddingLeft: 15,
    paddingRight: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  cityBox: {
    display: 'flex',
    flexDirection: 'row',
  },
  city: {
    fontSize: 15,
    color: '#666',
    maxWidth: 50,
    lineHeight: 44,
  },
  cityIcon: {
    width: 0,
    height: 0,
    borderWidth: 4,
    borderTopColor: '#b0b0b0',
    borderRightColor: '#fff',
    borderLeftColor: '#fff',
    borderBottomColor: '#fff',
    marginLeft: 4,
    marginTop: 21,
  },
  searchBtn: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginTop: 7,
    height: 29,
    marginLeft: 18,
    borderRadius: 5,
  },
  searchIcon: {
    width: 14,
    height: 14,
    marginRight: 2,
  },
  searchTitle: {
    fontSize: 13,
    color: '#b2b2b2',
  },
  filterBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: '#b0b0b0',
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingBottom: 10,
  },
  filterItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: '#b2b2b2',
    paddingLeft: 42,
    paddingRight: 42,
  },
  boderNone: {
    borderRightWidth: 0,
  },
  itemTitle: {
    fontSize: 13,
    color: '#777',
  },
  filterIcon: {
    marginTop: 8,
  },
  cinameItem: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 13,
    borderBottomWidth: 1,
    borderBottomColor: '#b2b2b2',
  },
  cinameTop: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  cinameName: {
    lineHeight: 23,
    fontSize: 16,
    color: '#000',
    marginRight: 10,
    marginBottom: 5,
  },
  sellPrice: {
    lineHeight: 23,
    fontSize: 16,
    color: '#f03d37',
  },
  cinameMiddle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  cinameAddr: {
    width: 310,
    fontSize: 13,
    color: '#666',
  },
  distance: {
    fontSize: 13,
    color: '#666',
  },
  cardItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 5,
  },
  cardIcon: {
    width: 14,
    height: 14,
  },
  cardPromotionTag: {
    color: '#999',
    fontSize: 11,
    marginLeft: 4,
  },
  tagItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  refund: {
    color: '#589daf',
    borderWidth: 1,
    borderColor: '#589daf',
    paddingLeft: 3,
    paddingRight: 3,
    fontSize: 12,
    lineHeight: 18,
    marginRight: 5,
  },
  snack: {
    color: '#f90',
    borderWidth: 1,
    borderColor: '#f90',
    paddingLeft: 3,
    paddingRight: 3,
    fontSize: 12,
    lineHeight: 18,
    marginRight: 5,
  },
});

export default connect(state => ({
  city: state.city.city,
}))(Cinema);
