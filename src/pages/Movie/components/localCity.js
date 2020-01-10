import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-navigation';
export default class LocalCity extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      btnName: '深圳',
    };
  }
  render() {
    const {btnName} = this.state;
    return (
      <SafeAreaView style={styles.contaner}>
        <View style={styles.contaner}>
          <Text style={styles.title}>定位城市</Text>
          <View style={styles.localBox}>
            <Text style={styles.localBtn}>{btnName}</Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  contaner: {
    backgroundColor: '#ebebeb',
    flex: 1,
  },
  title: {
    paddingLeft: 15,
    lineHeight: 30,
    fontSize: 14,
    color: '#333',
  },
  localBox: {
    backgroundColor: '#f5f5f5',
    marginRight: 30,
    paddingBottom: 8,
    paddingLeft: 15,
  },
  localBtn: {
    paddingLeft: 20,
    marginTop: 15,
    paddingRight: 20,
    backgroundColor: '#fff',
    color: '#333',
    fontSize: 14,
    lineHeight: 30,
    maxWidth: 100,
  },
});
