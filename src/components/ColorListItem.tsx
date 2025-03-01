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
        {color.toUpperCase()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  colorBox: {
    marginHorizontal: 5,
    width: BOX_SIZE,
    height: BOX_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 16,
  },
  textColorBox: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default ColorListItem;
