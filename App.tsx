import { useState } from 'react';
import { Pressable, StatusBar } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';

const MAX_HEX_VALUE = 16777215; // (256 x 256 x 256) -1

export default function App() {
  const [currentColor, setCurrentColor] = useState('#FFFFFF');

  const generateRandomColor = () => {
    const randomColor = `#${Math.floor(Math.random() * MAX_HEX_VALUE).toString(
      16
    )}`;
    setCurrentColor(randomColor);
  };
  return (
    <Pressable
      style={[styles.container, { backgroundColor: currentColor }]}
      onPress={generateRandomColor}
    >
      <Text>Hello there</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
