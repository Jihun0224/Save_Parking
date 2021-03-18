import React,{Component} from 'react'
import {SafeAreaView,View, Text, ScrollView,Linking, Button} from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FeatherIcons from 'react-native-vector-icons/Feather';
import {TouchableOpacity} from 'react-native-gesture-handler';

class MarkerDisplay extends Component {

  handlePress(){
    
    const currPos ={latitude:128.6402609, longitude:35.2538433}
    const place_name = "창원대"
    const url = `geo:${currPos.latitude},${currPos.longitude}?q=${place_name}`
    console.log(url);
    Linking.canOpenURL(url)
    .then(supported => {
      if (!supported) {
        console.log('Unsupported URL: ' + url)
      } else {
        return Linking.openURL(url)
      }
    }).catch(err => console.error('An error occurred ', err))
    }

  render() {
    return (
      <SafeAreaView style={styles.container}>
            <FeatherIcons style={styles.minusicon} name="minus" size={35} color="#dee2e6"/>
          <View style={styles.header}>
            <View style={styles.division_border}>
              <Text style={styles.division}>구분</Text>
            </View>
            <Text style={styles.header_text}>주차장 이름</Text>
              <View style={styles.naviIcon}>

                <TouchableOpacity onPress={() => this.handlePress()}>
                <MaterialIcons
                      name="assistant-direction"
                      size={45}
                      color="#1e90ff"
                    />
                </TouchableOpacity>
              </View>

          </View>
        
          <ScrollView style={styles.markerData}>
            
            <Text style={{fontSize:20, paddingLeft:10,paddingTop:10}}>데이터</Text>

          </ScrollView>
        </SafeAreaView>

    )
  }
}

const styles = {
  container: {
    flex: 1,
    zIndex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    width:'100%',
  },
  division_border:{
    borderRadius: 25,
    borderWidth: 2,
    width:40,
    height:40,
    position:"absolute",
    top:-5,
    left:10,
    borderColor:"#dee2e6"
  },
  division:{

    fontSize:15,
    fontWeight: 'bold',
    position:"absolute",
    top:8,
    left:4,
    color: "#777B7E"
  },
  header: {
    height: 50,
    backgroundColor: 'white',
    width:'100%',
    borderBottomWidth: 1,
    borderBottomColor: "#dee2e6",
  },
  header_text:{
    fontSize:22,
    position:"absolute",
    left: 60,
  },
  minusicon:{
    marginTop:-5
  },
  naviIcon:{
    position: "absolute",
    top: -10,
    right:5,
    alignSelf: 'flex-end',

  },
  markerData:{
    alignSelf:'flex-start',
    paddingLeft:5
  }
}

export default MarkerDisplay;