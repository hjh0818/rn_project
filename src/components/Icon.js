import React from 'react';
import {Text} from 'react-native';

const iconMap = {
  movie: '♡',
  cinema: '♢',
  mine: '♧',
};
const Icon = ({name, color, style}) => {
  const icon = iconMap[name];
  const iconStyle = {
    fontSize: 26,
    color,
  };
  return <Text style={[iconStyle, style]}>{icon}</Text>;
};

export default Icon;
