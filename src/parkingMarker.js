import React,{Component} from 'react';
import { StyleSheet, ImageBackground,Text,View } from 'react-native';
import Speech_Bubble from './images//speech-bubble.png';

export default class ParkingMarker extends Component{

    render(){
      let price = 60/this.props.basicTime * this.props.price
        return (
        <View  style={styles.marker}>
            <ImageBackground
                resizeMode="contain"
                source={Speech_Bubble}
                style={styles.imageBackground}
                imageStyle={{tintColor:"#002166"}}>
        <Text style={{color:'white', bottom:5}}>
          ₩{price}
        </Text>
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