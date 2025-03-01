import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { BOX_SIZE } from '../constants';
import { returnBlackOrWhite } from '../utils';

type ColorListItemProps = {
  color: string;
};

const ColorListItem = ({ color }: ColorListItemProps) => {
  return (
    <View style={[styles.colorBox, { backgroundColor: color }]}>
      <Text style={[styles.textColorBox, { color: returnBlackOrWhite(color) }]}>
        {color}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  colorBox: {
    width: BOX_SIZE,
    height: BOX_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderLeftWidth: 1,
  },
  textColorBox: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default ColorListItem;
