import React from 'react';
import {Text, StyleSheet, StatusBar, View} from 'react-native';
import {SafeAreaView} from 'react-navigation';

export default class Cinema extends React.Component {
  static navigationOptions = {
    // 设置 title
    title: '影院',
  };
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <SafeAreaView style={styles.contaner}>
        <StatusBar barStyle="dark-content" />
        <View>
          <Text>影院</Text>
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
    backgroundColor: '#f00',
  },
});
