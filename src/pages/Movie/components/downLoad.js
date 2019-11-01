import React from 'react';
import {Text, StyleSheet, View, ImageBackground} from 'react-native';
import {SafeAreaView} from 'react-navigation';
export default class DownLoad extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <SafeAreaView style={styles.contaner}>
        <View style={styles.contaner}>
          <ImageBackground
            source={{
              uri:
                'http://s0.meituan.net/bs/?f=myfe/canary:/img/download/bg-new.png',
            }}
            style={styles.imageTitle}
          />
          <View style={styles.downLoadBox}>
            <Text style={styles.downLoadBtn}>立即下载</Text>
          </View>
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
  imageTitle: {
    flex: 0.5,
  },
  downLoadBox: {
    marginTop: 40,
    display: 'flex',
    alignItems: 'center',
  },
  downLoadBtn: {
    width: 250,
    textAlign: 'center',
    backgroundColor: '#ef4238',
    color: '#fff',
    fontSize: 16,
    lineHeight: 40,
    borderRadius: 44,
  },
});
