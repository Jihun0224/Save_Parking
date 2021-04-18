import React,{Component} from 'react';
import {Marker,Align} from "react-native-nmap";

export default class ParkingMarker extends Component{

    render(){
      let price;
      if(this.props.parking.parkingchrgeInfo == '무료'){
        price = this.props.parking.parkingchrgeInfo
      }
      else if(this.props.parking.basicTime !='' && this.props.parking.basicCharge!=''){
        if(this.props.parking.basicTime > 60){
          price = '₩'+this.props.parking.basicCharge
        }
        else{
          price = '₩'+Math.round(60/this.props.parking.basicTime * this.props.parking.basicCharge)
        }
      }
      else if(this.props.parking.monthCmmtkt == 0 || 
              this.props.parking.monthCmmtkt == '' || 
              this.props.parking.monthCmmtkt == Infinity || 
              this.props.parking.monthCmmtkt == null){
                price = "정보없음"
        }
      else{
        price = '₩'+this.props.parking.monthCmmtkt
      }
      
        return (
          <Marker 
          key= {this.props.index} 
          onClick={()=>{this.props.setSelectedParking(this.props.parking)}} 
          coordinate={{ 
            latitude: parseFloat(this.props.parking.latitude), 
            longitude: parseFloat(this.props.parking.longitude)}}
          width={55} 
          height={50}
          pinColor="#002166"
          image={require('./images/speech-bubble.png')}
          caption={{text: price,textSize:13,color:"#ffffff",haloColor:'none',align:Align.Center}}
        />

    )
  }
}