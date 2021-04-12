import React,{Component} from 'react';
import { StyleSheet, ImageBackground,Text,View } from 'react-native';
import CCTV from './car.png';

export default class CarMarker extends Component{
    render(){
        return (
        <View  style={styles.marker}>
            <ImageBackground
                resizeMode="contain"
                source={CCTV}
                style={styles.imageBackground}
                imageStyle={{tintColor:"#002166"}}>
      </ImageBackground>
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