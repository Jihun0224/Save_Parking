import React,{Component} from 'react';
import { StyleSheet, ImageBackground,Text,View } from 'react-native';
import cctv from './images/cctv.png';

export default class CctvMarker extends Component{

    render(){
        return (
        <View  style={styles.marker}>
            <ImageBackground
                resizeMode="contain"
                source={cctv}
                style={styles.imageBackground}
                imageStyle={{tintColor:"black"}}/>
      </View>

    )
  }
}
  const styles = StyleSheet.create({
    imageBackground: {
        width:100,
        height:45,
        justifyContent: 'center',
        alignItems: 'center',
    },
    marker:{
        paddingBottom:5
    }
  });