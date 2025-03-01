import { useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet } from 'react-native';
import ColorList from './src/components/ColorList';
import { MAX_HEX_VALUE, WHITE_COLOR } from './src/constants';
import { returnBlackOrWhite } from './src/utils';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function App() {
  const [previousColor, setPreviousColor] = useState(WHITE_COLOR);
  const [nextColor, setNextColor] = useState(WHITE_COLOR);
  const [lastFiveColors, setLastFiveColors] = useState<string[]>([]);

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
      setLastFiveColors([...lastFiveColors, randomColor].slice(-5));
    });
  };

  const currentColor = animatedColor.interpolate({
    inputRange: [0, 1],
    outputRange: [previousColor, nextColor],
  });

  const fontColor = animatedColor.interpolate({
    inputRange: [0, 1],
    outputRange: [
      returnBlackOrWhite(previousColor),
      returnBlackOrWhite(nextColor),
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
      <ColorList data={lastFiveColors} />
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
