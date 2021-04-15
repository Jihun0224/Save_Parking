import React,{Component} from 'react';
import { StyleSheet, ImageBackground,Text,View } from 'react-native';
import smartPhone from './images/smartPhone.png';

export default class SmartPhoneMarker extends Component{

    render(){
        return (
        <View  style={styles.marker}>
            <ImageBackground
                resizeMode="contain"
                source={smartPhone}
                style={styles.imageBackground}
                />
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