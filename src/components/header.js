import React from 'react';
import {Text} from 'react-native';

const Header = ({name}) => {
  const iconStyle = {
    fontSize: 20,
    textAlign: 'center',
    lineHeight: 60,
    backgroundColor: '#e54847',
    color: '#fff',
  };
  return <Text style={[iconStyle]}>{name}</Text>;
};

export default Header;
