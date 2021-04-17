import React,{Component} from 'react';
import {Marker} from "react-native-nmap";

export default class AreaMarker extends Component{

    render(){
        return (
            <>
            {this.props.area.ctlType == '인력단속'
            ?<Marker 
              key= {this.props.index} 
              onClick={()=>{this.props.setSelectedArea(this.props.area)}} 
              coordinate={{ 
                latitude: parseFloat(this.props.area.latitude), 
                longitude: parseFloat(this.props.area.longitude)}}
              width={50} 
              height={50}
              image={require('./images/car.png')}
            />
              :this.props.area.ctlType == '스마트폰단속'
                ?<Marker 
                key= {this.props.index} 
                onClick={()=>{this.props.setSelectedArea(this.props.area)}} 
                coordinate={{ 
                  latitude: parseFloat(this.props.area.latitude), 
                  longitude: parseFloat(this.props.area.longitude)}}
                width={50} 
                height={50}
                image={require('./images/smartphone.png')}
              />
                :<Marker 
                key= {this.props.index} 
                onClick={()=>{this.props.setSelectedArea(this.props.area)}} 
                coordinate={{ 
                  latitude: parseFloat(this.props.area.latitude), 
                  longitude: parseFloat(this.props.area.longitude)}}
                width={50} 
                height={50}
                image={require('./images/cctv.png')}
              />
                }
           </>
    )
  }
}