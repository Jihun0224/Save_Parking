import React,{ Component } from "react";
import CarConnect from "react-native-car-connect";
import {View} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
 
export default class Bluetooth extends Component{
    constructor(props){
        super(props);
        this.state={
            
        }
    }

    ConnectFunctionalComponent() {
        () => {
          CarEvents.addListener("onConnect", res => {
            alert("Car connected state = ", res);
          });
          CarEvents.addListener("onDisconnect", res => {
            alert("Car disconnected state = ", res);
          });
          // pass in true to use background thread
          CarConnect.start(true);
          return () => {
            CarConnect.stop(true);
            this.ConfirmPosition();
          };
        }
     
      return null;
    }

    ConfirmPosition(){
        let cur_lat = 0;
        let cur_lon = 0;
        let area_lat = 0;
        let area_lon = 0;
        let cur_lat_minute = 0;
        let cur_lon_minute = 0;
        let cur_lat_seconds = 0;
        let cur_lon_seconds = 0;
        let area_lat_minute = 0;
        let area_lon_minute = 0;
        let area_lat_seconds = 0;
        let area_lon_seconds = 0;
        let distance = 0;
        
        if(CarConnect.connected == false){
            Geolocation.getCurrentPosition(
                position => {
                    cur_lat = Math.floor(position.coords.latitude); //현재 위도
                    cur_lon = Math.floor(position.coords.longitude); //현재 경도
                    cur_lat_minute = Math.floor((position.coords.latitude%1)*60)
                    cur_lon_minute = Math.floor((position.coords.longitude%1)*60)
                    cur_lat_seconds = (((position.coords.latitude%1)*60)%1).toFixed(2)
                    cur_lon_seconds = (((position.coords.longitude%1)*60)%1).toFixed(2)
                }
            )
            for(i=0; i<filteredAreaData.lenth; i++){
                area_lat = Math.floor(area.latitude)
                area_lon = Math.floor(area.longitude)
                area_lat_minute = Math.floor((area.latitude%1)*60)
                area_lon_minute = Math.floor((area.longitude%1)*60)
                area_lat_seconds = (((area.latitude%1)*60)%1).toFixed(2)
                area_lon_seconds = (((area.longitude%1)*60)%1).toFixed(2)
                distance =
                Math.sqrt(Math.pow(((cur_lat-area_lat)*Math.cos(cur_lat-area_lat)*88.9)+((cur_lat_minute-area_lat_minute)*Math.cos(cur_lat-area_lat)*1.48)+((cur_lat_seconds-area_lat_seconds)*Math.cos(cur_lat-area_lat)*0.025),2)
                +Math.pow(((cur_lon-area_lon)*Math.cos(cur_lon-area_lon)*88.9)+((cur_lon_minute-area_lon_minute)*Math.cos(cur_lon-area_lon)*1.48)+((cur_lon_seconds-area_lon_seconds)*Math.cos(cur_lon-area_lon)*0.025),2))
                
                if(distance*1000<=150){
                    return //금지구역 알람 푸쉬
                }
                else{}
                
            }
            
        }
    }

    render(){
        return(
            <View>
            {this.ConnectFunctionalComponent()}
            {console.log(CarConnect.connected+"확인")}
            </View>
        )
    }
}
