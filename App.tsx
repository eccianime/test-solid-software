import { useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, Text } from 'react-native';

const MAX_HEX_VALUE = 16777215; // (256 x 256 x 256) -1
const INITIAL_COLOR = '#FFFFFF';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function App() {
  const [previousColor, setPreviousColor] = useState(INITIAL_COLOR);
  const [nextColor, setNextColor] = useState(INITIAL_COLOR);

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

  return (
    <AnimatedPressable
      style={[styles.container, { backgroundColor: currentColor }]}
      onPress={generateRandomColor}
    >
      <Text style={styles.text}>Hello there</Text>
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
