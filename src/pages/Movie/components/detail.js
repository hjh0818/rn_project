import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-navigation';
const rightStyle = {
  height: 44,
  width: 55,
  justifyContent: 'center',
  paddingRight: 15,
};
export default class Detail extends React.Component {
  static navigationOptions = {
    title: '电影详情',
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
    const {movieMsg} = this.props.navigation.state.params;
    return (
      <SafeAreaView style={styles.contaner}>
        <View>
          <Text>{movieMsg.nm}</Text>
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
