import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-navigation';
const rightStyle = {
  height: 44,
  width: 55,
  justifyContent: 'center',
  paddingRight: 15,
};
export default class SearchMovie extends React.Component {
  static navigationOptions = {
    title: '搜索电影',
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
    return (
      <SafeAreaView style={styles.contaner}>
        <View style={styles.contaner}>
          <Text>搜索</Text>
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
});
