import React,{Component} from 'react';
import { StyleSheet, ImageBackground,Text,View } from 'react-native';
import car from './images/car.png';

export default class CarMarker extends Component{

    render(){
        return (
        <View  style={styles.marker}>
            <ImageBackground
                resizeMode="contain"
                source={car}
                style={styles.imageBackground}
                imageStyle={{tintColor:"gray"}}
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