import React,{Component} from 'react';
import { StyleSheet, ImageBackground,Text,View } from 'react-native';
import CCTV from './images/cctv.png';
import Marker from './images/marker.png';

export default class cctvMarker extends Component{
    render(){
        return (
        <View  style={styles.marker}>
          <ImageBackground
                resizeMode="contain"
                source={Marker}
                style={styles.imageBackground}
                imageStyle={{tintColor:"#002166"}}>
            <ImageBackground
                resizeMode="contain"
                source={CCTV}
                style={styles.CCTV}
                imageStyle={{tintColor:"#ffffff"}}>
            </ImageBackground>
          </ImageBackground>
      </View>

    )
  }
}
  const styles = StyleSheet.create({
    imageBackground: {
        width:40,
        height:40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    CCTV: {
      width: 28,
      height: 30,
      justifyContent: 'center',
      alignItems: 'center',
    },
    marker:{
        paddingBottom:5
    }
  });