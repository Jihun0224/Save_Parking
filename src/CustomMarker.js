import React,{Component} from 'react';
import { StyleSheet, ImageBackground,Text,View,Image } from 'react-native';
import Speech_Bubble from './speech-bubble.png';

export default class CustomMarker extends Component{
    render(){
        return (
        <View  style={styles.marker}>
            <ImageBackground
                resizeMode="contain"
                source={Speech_Bubble}
                style={styles.imageBackground}
                imageStyle={{tintColor:"#002166"}}>
        <Text style={{color:'white', bottom:5}}>
            {this.props.price}원
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