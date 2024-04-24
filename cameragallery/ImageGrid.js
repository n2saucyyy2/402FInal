import React, {useState} from 'react';
import { Image, TouchableOpacity, Button, FlatList, StyleSheet, Text, View, ListItem } from 'react-native';

const ImageGrid = (props) => {

const [curphoto, setcurphoto] = useState(0);
const [plength, setPlength] = useState(0);

const gstyles = StyleSheet.create({
  container: {
   borderWidth: 5,
      flex: 4,
    justifyContent: 'center',
    backgroundColor: 'white',
    width: 300,
  },
  logo: {
    flex: 1,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  });

function prevImage() {
  if (curphoto == 0)
  {
    return;
  }
  else{
    var newphotog = curphoto -1;
    setcurphoto(newphotog);
  }
};

function nextImage() {
  var lasti = props.photolist.length-1;
  if (lasti == curphoto)
  {
    return;
  }
  else
  {
    var newphotog = curphoto +1;
    setcurphoto(newphotog);
  }
};


const renderItem = ({ item ,index}) => {
  asource = {uri: props.photolist[index].uri};
       return (
         <View  style={{
              flex: 4,
              flexDirection: 'column',
              margin: 3
            }}>
        <Image style={gstyles.logo} source={asource} />
        <Text> {item.name} </Text>
         </View>
    );
 };

var asource = props.source;
if (props.photolist.length > 0)
{
  var avl = curphoto;
  if (plength != props.photolist.length)
  {
     avl = 0;
     setPlength(props.photolist.length);
     setcurphoto(0);
  }
   console.log(avl);
   asource = {uri: props.photolist[avl].uri};
}
console.log(props.photolist.length);

var preview= <View style={gstyles.container} >
        <FlatList 
           data={props.photolist}
             renderItem={renderItem}
              numColumns={2}
              keyExtractor={(item, index) => index}
              />
        </View>
   return (preview);
};


export default ImageGrid;