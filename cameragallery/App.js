// import the necessary components
import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity,Platform, PermissionsAndroid, TextInput} from 'react-native';
import { Camera } from 'expo-camera';
import PreviewList from './PreviewList';
import ListGrid from './ListGrid';
import { useWindowDimensions } from 'react-native';
// declare a basic Application
export default function CameraApp() {
  
  var aplist = [];

  // define variables that save information between UI redraws.
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [onetime, setOneTime] = useState(true);
  const [aphoto, setPhoto] = useState('assets/snack-icon.png');
  const [photolist, setPhotoList] = useState(aplist);
  const [viewmode, setVMode] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentNote, setCurrentNote] = useState('');
 
  const SCREEN_WIDTH = useWindowDimensions().width;
  const SCREEN_HEIGHT = useWindowDimensions().height;
  
    
  // use the useEffect hook to declare code to be executed after redraw.
  useEffect(() => {
    if (onetime)
    {
       
       (async () => {
           const { status } = await Camera.requestCameraPermissionsAsync();
                         setHasPermission(status === 'granted');
        })();
     
    
       setOneTime(false);
    }
    
  }, );  

  const deletePhoto = () => {
    const newPhotoList = [...photolist];
    newPhotoList.splice(currentIndex, 1);
    setPhotoList(newPhotoList);
    if (currentIndex === newPhotoList.length) {
      setCurrentIndex(newPhotoList.length - 1);
    } else {
      setCurrentIndex(currentIndex);
    }
  };

  // if do not have permission to access camera show notice
  if (hasPermission === null) {
    var notice = <View ><Text>No Access To Cameara</Text></View>;
    return notice;
  }

  if (hasPermission === false) {
    var anotice = <View ><Text>No Access To Cameara</Text></View>;
    return anotice;
  }

  var mainstyle = styles.tallbox;
  
  if (SCREEN_WIDTH > SCREEN_HEIGHT)
  {
    mainstyle = styles.widebox;
 }
 
 var camui = <Text> Major Failure</Text>
 if (viewmode)
 {
  camui = <View style={mainstyle}>
         <Camera 
           ref={ref => { 
                 this.SnapCamera = ref;
            }} style={styles.camera} type={type} />
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              snap();
            }}>
            <Text > Snap </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Text > Flip </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {switchMode();  }}>
            <Text > Switch-UI </Text>
          </TouchableOpacity>
        </View>
        <ListGrid photolist={photolist} source={{uri: aphoto}} />
     </View> }
 
  else{
    camui = <View style={mainstyle}>
         <Camera 
           ref={ref => { 
                 this.SnapCamera = ref;
            }} style={styles.camera} type={type} />
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              snap();
            }}>
            <Text style={styles.bstyle}> Add </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Text  style={styles.bstyle}> Flip </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {switchMode();  }}>
            <Text  style={styles.bstyle}> Switch-UI </Text>
          </TouchableOpacity>
        </View>
        <TextInput
        style = {styles.textInput}
        placeholder = "Enter a note for video/picture."
        onChangeText = {setCurrentNote}
        placeholderTextColor = "#888"
        />
        <PreviewList
        photolist={photolist}
        source={photolist.length > 0 ? { uri: photolist[currentIndex].uri } : { uri: aphoto }}
        deletePhoto={deletePhoto}
        setPhotoList={setPhotoList} 
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}/>
     </View>
  }

  function switchMode()
  {
     if (viewmode) // in grid mode
     {
         setVMode(false);
     }
     else // in Preview mode
     {
          setVMode(true);
     }
  }
  
  // function to take camera picture
  var snap = async () => {
     console.log("Take Snap");
     if (this.SnapCamera) {
        console.log("Camera Available");
        const options = { quality: 0.5, base64: true }
        let photo = await this.SnapCamera.takePictureAsync(options);
        const photoWithNote = { uri: photo.uri, note: currentNote, name: "Photo " + photolist.length };
        const splist = [photoWithNote, ...photolist];
        setPhotoList(splist);
        setCurrentNote('');
 
        //console.log(photo.uri);
        console.log("Got the Photo");
     }
  };


  return (camui);
}

const styles = StyleSheet.create({
  tallbox: {
   flex: 4,
   margingTop: 50,
   flexDirection: "column",
   borderWidth: 5,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 50,
  },
  widebox: {
   flex: 4,
   paddingTop: 0,
   paddingLeft: 10,
   flexDirection: "row",
   borderWidth: 5,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  camera: {
    flex: 4,
    height: 300,
    width: "80%",
    padding: 5,
    borderWidth: 6,
    objectFit: 'cover',
  },
   preview: {
    flex: 4,
    height: 300,
    width: "100%",
    padding: 5,
    borderWidth: 6,
  },
   bstyle: {
    padding: 0
  },
  buttonRow: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 2,
      padding: 0,
      paddingTop: 0,
      margin: 5
  },
  textInput: {
  height: 40,
  borderColor: 'gray',
  borderWidth: 1,
  marginTop: 10,
  marginBottom: 10,
  paddingHorizontal: 10,
  color: 'black',
  width: '90%',  // Adjust width as necessary
  alignSelf: 'center'
}
   
});