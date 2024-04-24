import React from 'react';
import { TouchableOpacity, Button, FlatList, StyleSheet, Text, View, ListItem } from 'react-native';

const ImageList = () => {

const renderItem = ({ item,index }) => {
 const onephoto= <ListItem
        item={item}
        onPress={() => {return;}}
        backgroundColor={'white'}
        textColor={ 'black'}
      />

    return (onephoto);
  };

 var photolist = [];

const gstyles = StyleSheet.create({
  container: {
   flex: 4,
   flexDirection: "column",
   borderWidth: 5,
    backgroundColor: '#fff',
    alignItems: 'center',
  }
  });

var ilist=<View style={gstyles.container} >
             <FlatList data={photolist}
             renderItem={renderItem}
  
              />
               </View>

   return (ilist);
};

export default ImageList;