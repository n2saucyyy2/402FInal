// import { Text, View, StyleSheet, Image } from 'react-native';

// export default function AssetExample() {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.paragraph}>
//         Local files and assets can be imported by dragging and dropping them into the editor
//       </Text>
//       <Image style={styles.logo} source={require('../assets/snack-icon.png')} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 24,
//   },
//   paragraph: {
//     margin: 24,
//     marginTop: 0,
//     fontSize: 14,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   logo: {
//     height: 128,
//     width: 128,
//   }
// });


// import React, { useEffect, useState } from 'react';
// import { Text, View, StyleSheet, Image, Button, Platform, Alert } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';

// export default function AssetExample() {
//     const [image, setImage] = useState(null);

//     useEffect(() => {
//         requestPermission();
//     }, []);

//     const requestPermission = async () => {
//         const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//         if (status !== 'granted') {
//             alert('Sorry, we need camera roll permissions to make this work!');
//             console.log('Media library access denied');
//             return;
//         }
//         console.log('Media library access granted');
//     };

//     const pickImage = async () => {
//         console.log('Picking image');
//         const result = await ImagePicker.launchImageLibraryAsync({
//             mediaTypes: ImagePicker.MediaTypeOptions.Images,
//             allowsEditing: true,
//             aspect: [4, 3],
//             quality: 1,
//         });

//         console.log('Pick image result:', result);

//         if (!result.cancelled) {
//             setImage(result.uri);
//         }
//     };

//     return (
//         <View style={styles.container}>
//             <Text style={styles.paragraph}>
//                 Local files and assets can be imported by dragging and dropping them into the editor, or added from your gallery.
//             </Text>
//             <Button title="Pick an image from gallery" onPress={pickImage} />
//             {image && <Image source={{ uri: image }} style={styles.logo} />}
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         alignItems: 'center',
//         justifyContent: 'center',
//         padding: 24,
//     },
//     paragraph: {
//         margin: 24,
//         marginTop: 0,
//         fontSize: 14,
//         fontWeight: 'bold',
//         textAlign: 'center',
//     },
//     logo: {
//         height: 128,
//         width: 128,
//     }
// });

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
