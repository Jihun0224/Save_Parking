import React,{Component} from 'react';
import { StyleSheet, ImageBackground,Text,View } from 'react-native';
import Speech_Bubble from './images/speech-bubble.png';

export default class ParkingMarker extends Component{

    render(){
      let price;
      if(this.props.basicTime !='' && this.props.basicCharge!=''){
        price = '₩'+60/this.props.basicTime * this.props.basicCharge
      }
      else if(this.props.monthCmmtkt == 0 || this.props.monthCmmtkt == '' || this.props.monthCmmtkt == Infinity|| this.props.monthCmmtkt == null){
        price = "정보없음"
        }
      else{
        price = '₩'+this.props.monthCmmtkt
      }
      
        return (
        <View  style={styles.marker}>

                {this.props.parkingchrgeInfo=='무료'
                ? <Text style={{color:'white', bottom:5}}>
                    무료
                  </Text>
                : <Text style={{color:'white', bottom:5}}>
                    {price}
                  </Text>
                }

      </View>

    )
  }
}
  const styles = StyleSheet.create({
    imageBackground: {
        width:55,
        height:45,
        justifyContent: 'center',
        alignItems: 'center',
    },
    marker:{
        paddingBottom:5
    }
  });