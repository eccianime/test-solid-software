import { useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, Text } from 'react-native';

const MAX_HEX_VALUE = 16777215; // (256 x 256 x 256) -1
const WHITE_COLOR = '#FFFFFF';
const BLACK_COLOR = '#000000';

const PONDERATIONS = {
  R: 0.2126,
  G: 0.7152,
  B: 0.0722,
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const getBrightness = (hex: string) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return PONDERATIONS.R * r + PONDERATIONS.G * g + PONDERATIONS.B * b;
};

export default function App() {
  const [previousColor, setPreviousColor] = useState(WHITE_COLOR);
  const [nextColor, setNextColor] = useState(WHITE_COLOR);

  const animatedColor = useRef(new Animated.Value(0)).current;

  const generateRandomColor = () => {
    const randomColor = `#${Math.floor(Math.random() * MAX_HEX_VALUE)
      .toString(16)
      .padStart(6, '0')}`;

    animatedColor.setValue(0);
    setNextColor(randomColor);

    Animated.timing(animatedColor, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start(() => {
      setPreviousColor(randomColor);
    });
  };

  const currentColor = animatedColor.interpolate({
    inputRange: [0, 1],
    outputRange: [previousColor, nextColor],
  });

  const fontColor = animatedColor.interpolate({
    inputRange: [0, 1],
    outputRange: [
      getBrightness(previousColor) < 128 ? WHITE_COLOR : BLACK_COLOR,
      getBrightness(nextColor) < 128 ? WHITE_COLOR : BLACK_COLOR,
    ],
  });

  return (
    <AnimatedPressable
      style={[styles.container, { backgroundColor: currentColor }]}
      onPress={generateRandomColor}
    >
      <Animated.Text style={[styles.text, { color: fontColor }]}>
        Hello there
      </Animated.Text>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
