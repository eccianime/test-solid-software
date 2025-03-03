# Random Color App

This React Native application generates random colors when the screen is tapped, and displays the last five generated colors in a horizontal list. The app uses animations to smoothly transition between colors and dynamically adjusts the font color to maintain readability.

## Features

- **Random Color Generation**: Tap anywhere on the screen to generate a random color.
- **Smooth Transitions**: The background color smoothly transitions between the previous and new colors using `Animated` API.
- **Readability**: The text color automatically adjusts to either black or white depending on the brightness of the background color.
- **Last Five Colors**: Displays the last five generated colors in a horizontal list.

## Installation

To run this project, make sure you have React Native set up on your machine. If not, follow the installation guide from the [React Native Documentation](https://reactnative.dev/docs/environment-setup).

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/eccianime/test-solid-software.git
   cd test-solid-software
   ```
   
2. Install dependencies:

    ```bash
    npm install
    ```

3. Run the app:

    ```bash
    npx react-native run-android  # For Android
    npx react-native run-ios      # For iOS
    ```
    
## Code Explanation

### Color Calculation
The app calculates the brightness of the background color to determine whether to display the text in black or white. This is done using the following formula:

  ```javascript
  const getBrightness = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return PONDERATIONS.R * r + PONDERATIONS.G * g + PONDERATIONS.B * b;
  };
  ```

### Animations
The transition between colors is animated using the Animated API. The Animated.Value is used to interpolate between the previous and next colors:

```javascript
const currentColor = animatedColor.interpolate({
  inputRange: [0, 1],
  outputRange: [previousColor, nextColor],
});
```

### Last Five Colors
The app maintains the last five generated colors in the lastFiveColors state, and displays them using a FlatList:

```javascript
<FlatList
  data={lastFiveColors}
  renderItem={renderItem}
  horizontal
  contentContainerStyle={styles.listInternal}
/>
```

### Styling
The app uses a simple layout with centered text and color boxes. It employs StyleSheet to define styles for the components, including the dynamic font color and the background color change animation.

### License
This project is licensed under the MIT License. Feel free to customize and extend the app as per your needs!

### Demo

![Demo](https://github.com/eccianime/test-solid-software/blob/master/demo.gif)

