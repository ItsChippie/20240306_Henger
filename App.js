import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Animated } from 'react-native';

const App = () => {
  const [radius, setRadius] = useState('');
  const [height, setHeight] = useState('');
  const [surfaceArea, setSurfaceArea] = useState(null);
  const [animatedColor] = useState(new Animated.Value(0));

  useEffect(() => {
    startRainbowAnimation();
  }, []);

  const calculateSurfaceArea = () => {
    const r = parseFloat(radius);
    const h = parseFloat(height);

    if (!isNaN(r) && !isNaN(h) && r > 0 && h > 0) {
      const area = 2 * Math.PI * r * (r + h);
      setSurfaceArea(area.toFixed(2));
    } else {
      setSurfaceArea(null);
    }
  };

  const startRainbowAnimation = () => {
    Animated.timing(animatedColor, {
      toValue: 1,
      duration: 1600,   //1,6 másodperc alatt megy körbe az összes színen
      useNativeDriver: false,
    }).start(() => {
      animatedColor.setValue(0); //újra indítja és előlről kezdi
      startRainbowAnimation(); //újraindítja az animációt
    });
  };

  const buttonColor = animatedColor.interpolate({
    inputRange: [0, 0.25, 0.5, 0.75, 1],
    outputRange: [
      'rgb(255, 0, 0)', // Piros
      'rgb(255, 255, 0)', // Sárga
      'rgb(0, 255, 0)', // Zöld
      'rgb(0, 0, 255)', // Kék
      'rgb(255, 0, 0)', // Piros
    ],
  });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>A kör alapú henger felszínének számítása</Text>
      <View style={styles.inputContainer}>
        <Text>Sugár:</Text>
        <TextInput
          style={styles.input}
          placeholder="Sugár"
          keyboardType="numeric"
          value={radius}
          onChangeText={(text) => setRadius(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>Magasság:</Text>
        <TextInput
          style={styles.input}
          placeholder="Magasság"
          keyboardType="numeric"
          value={height}
          onChangeText={(text) => setHeight(text)}
        />
      </View>
      <Animated.View style={[styles.buttonContainer, { backgroundColor: buttonColor }]}>
        <Button
          title="Számol"
          onPress={calculateSurfaceArea}
          color="transparent"
        />
      </Animated.View>
      {surfaceArea !== null && (
        <View style={styles.resultContainer}>
          <Text>Felszín:</Text>
          <Text style={styles.result}>{surfaceArea}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 5,
  },
  buttonContainer: {
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 16,
  },
  resultContainer: {
    marginTop: 16,
  },
  result: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
  },
});

export default App;
