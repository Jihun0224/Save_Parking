import React, {Component} from 'react';
import {PermissionsAndroid} from 'react-native';
import Main from "./main";
import Geolocation from 'react-native-geolocation-service';
import Loading from './loading';
export default class App extends Component{
 
    constructor(){
        super();
        this.state={
            currPos:{latitude: 128.6402609, longitude:35.2538433}, //최초 좌표객체[위도,경도]
            isLoading: true,
        }
    }
    async componentDidMount(){
        await this.requestLocationPermission()
     }
    render(){
        return(
          this.state.isLoading ?
          <Loading/>
            :<Main currPos={this.state.currPos}/>
        );         
    }

    async requestLocationPermission(){
            
        try{
            // 퍼미션 요청 다이얼로그 보이기
            const granted=await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
 
            if(granted== PermissionsAndroid.RESULTS.GRANTED){
                Geolocation.getCurrentPosition( (position)=>{
                    this.setState({currPos: position.coords});
                }, 
                (error)=>{

                    alert('error : '+error.message);
                });
            }else{
                alert('위치정보 사용을 거부하셨습니다.\n앱의 기능사용이 제한됩니다.');
            }
            this.setState({isLoading:false});
        }catch(err){alert('퍼미션 작업 에러');}
    }
}