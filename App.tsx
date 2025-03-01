import { useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const MAX_HEX_VALUE = 16777215; // (256 x 256 x 256) -1
const WHITE_COLOR = '#FFFFFF';
const BLACK_COLOR = '#000000';

const PONDERATIONS = {
  R: 0.2126,
  G: 0.7152,
  B: 0.0722,
};

const BOX_SIZE = Dimensions.get('window').width / 5;

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const getBrightness = (hex: string) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return PONDERATIONS.R * r + PONDERATIONS.G * g + PONDERATIONS.B * b;
};

const returnBlackOrWhite = (hex: string) => {
  const brightness = getBrightness(hex);
  return brightness > 128 ? BLACK_COLOR : WHITE_COLOR;
};

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

  const renderItem = ({ item }: { item: string }) => (
    <View style={[styles.colorBox, { backgroundColor: item }]}>
      <Text style={[styles.textColorBox, { color: returnBlackOrWhite(item) }]}>
        {item}
      </Text>
    </View>
  );

  return (
    <AnimatedPressable
      style={[styles.container, { backgroundColor: currentColor }]}
      onPress={generateRandomColor}
    >
      <Animated.Text style={[styles.text, { color: fontColor }]}>
        Hello there
      </Animated.Text>
      <FlatList
        data={lastFiveColors}
        bounces={false}
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        horizontal
        contentContainerStyle={styles.listInternal}
        style={styles.listExternal}
      />
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
  listExternal: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  listInternal: {
    flexGrow: 1,
    borderTopWidth: 1,
  },
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
