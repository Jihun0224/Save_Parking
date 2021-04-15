import React, {Component} from 'react';
import {PermissionsAndroid} from 'react-native';
import Main from "./src/main";
import Geolocation from 'react-native-geolocation-service';
import Loading from './src/loading';
import database from '@react-native-firebase/database';
import SplashScreen from 'react-native-splash-screen'

export default class App extends Component{
 
    constructor(props){
        super(props);
        this.state={
            currPos:{latitude:35.2538433 , longitude:128.6402609}, //최초 좌표객체[위도,경도]
            isGetPositionLoading: true,
            isParkingDataLoading:true,
            parking:[],
            area:[],
            Loading:true,
        }
    }
    getParkingData = () => {
        database()
        .ref(`parking`)
        .on('value', (snapshot) => {
            this.setState({
                parking: snapshot.val()
            },()=>{
                this.getAreaData()
        })
    });
}
getAreaData = () => {
    database()
    .ref(`area`)
    .on('value', (snapshot) => {
        this.setState({
            area: snapshot.val(),
            isParkingDataLoading:false
        },()=>{
            SplashScreen.hide();    
        })
});
}
    async componentDidMount(){

        await this.requestLocationPermission()
        
     }
     
    render(){
        return(
          this.state.isGetPositionLoading == false&&this.state.isParkingDataLoading == false
          ?<Main 
            parking={this.state.parking}
            currPos={this.state.currPos}
            area={this.state.area}
           />
          :<Loading/>
        );         
    }

    async requestLocationPermission(){
            
        try{
            const granted=await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
 
            if(granted== PermissionsAndroid.RESULTS.GRANTED){
                Geolocation.getCurrentPosition( (position)=>{
                    this.setState({currPos: position.coords},()=>{
                        this.setState({isGetPositionLoading:false},()=>{
                            this.getParkingData()
                        });
                    });
                }, 
                (error)=>{
                    alert('error : '+error.message);
                });
            }else{
                alert('위치정보 사용을 거부하셨습니다.\n앱의 기능사용이 제한됩니다.');
                this.setState({isGetPositionLoading:false},()=>{
                    this.getParkingData()
                });

            }
        }catch(err){alert('퍼미션 작업 에러');}
    }
}