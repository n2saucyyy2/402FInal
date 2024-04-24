import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function App() {
  const [image, setImage] = useState(null);

  useEffect(() => {
    requestPermission();
  }, []);

  const requestPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Pick an image</Text>
      </TouchableOpacity>
      {image && <Image source={{ uri: image }} style={styles.image} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#008CBA',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
});
