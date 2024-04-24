import React, { useState, useEffect } from 'react';
import { Image, TouchableOpacity, Button, FlatList, StyleSheet, Text, View, ListItem } from 'react-native';
import * as Sharing from 'expo-sharing';

const PreviewList = (props) => {
  const [curphoto, setCurPhoto] = useState(0);

  const gstyles = StyleSheet.create({
    preview: {
      flex: 6,
      height: 300,
      width: 300,
      padding: 2,
      borderWidth: 6,
    },
    buttonrow: {
      flex: 1,
      height: 150,
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 2,
      padding: 0,
      marginLeft: 0,
      marginRight: 0,
      marginTop: 0,
      marginBottom: 0,
      fontSize: 12,
    },
    logo: {
      flex: 4,
      height: 280,
      width: "100%",
      padding: 0
    },
  });

  function prevImage() {
    if (curphoto > 0) {
      setCurPhoto(curphoto - 1);
    }
  }

  function nextImage() {
    if (curphoto < props.photolist.length - 1) {
      setCurPhoto(curphoto + 1);
    }
  }

  async function shareImage() {
    const photo = props.photolist[curphoto];
    if (!(await Sharing.isAvailableAsync())) {
      console.log('Sharing is not available on your platform');
      return;
    }
    try {
      await Sharing.shareAsync(photo.uri);
    } catch (error) {
      console.log('Error sharing image:', error);
    }
  }

  function deletePhoto() {
    const newPhotoList = props.photolist.filter((_, index) => index !== curphoto);
    props.setPhotoList(newPhotoList);
    if (curphoto >= newPhotoList.length) {
      setCurPhoto(newPhotoList.length - 1);
    }
     if (newPhotoList.length === 0) {
    props.setVMode(true); // Switch to grid mode
  }
  }

  const asource = props.photolist.length > 0 ? { uri: props.photolist[curphoto].uri } : null;

  
  return (
    <View style={gstyles.preview} >
      {asource && <Image style={gstyles.logo} source={asource} />}
      <View style={gstyles.buttonrow} >
        <Button title='Prev' onPress={prevImage} disabled={curphoto === 0} style={{ padding: 0, fontSize: 12, color: 'green' }} />
        <Button title='Next' onPress={nextImage} disabled={curphoto === props.photolist.length - 1} style={{ padding: 0, fontSize: 12, color: 'green' }} />
        <Button title='Delete' onPress={deletePhoto} style={{ padding: 0, fontSize: 12, color: 'red' }} />
        <Button title='Share/Save' onPress={shareImage} style={{ padding: 0, fontSize: 12, color: 'green' }} />
      </View>
    </View>
  );
};

export default PreviewList;
