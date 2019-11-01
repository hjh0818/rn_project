import React from 'react';
import {Text, StyleSheet, StatusBar, View, FlatList} from 'react-native';
import {SafeAreaView} from 'react-navigation';
const rightStyle = {
  height: 44,
  width: 55,
  justifyContent: 'center',
  paddingRight: 15,
};
export default class Detail extends React.Component {
  static navigationOptions = {
    title: '详情',
    headerTitleStyle: {
      flex: 1,
      textAlign: 'center',
    },
    headerStyle: {backgroundColor: '#e54847'},
    headerTintColor: '#fff',
    headerRight: <View style={rightStyle} />,
  };
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {movieList} = this.props.navigation.state.params;
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
