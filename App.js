import React, {Component} from 'react';
import {PermissionsAndroid} from 'react-native';
import Main from "./src/main";
import Geolocation from 'react-native-geolocation-service';
import Loading from './src/loading';
export default class App extends Component{
 
    constructor(props){
        super(props);
        this.state={
            currPos:{latitude:35.2538433 , longitude:128.6402609}, //최초 좌표객체[위도,경도]
            isLoading: true,
        }
    }
    async componentDidMount(){
        await this.requestLocationPermission()
     }
    render(){
        return(
          this.state.isLoading 
          ?<Loading/>
          :<Main currPos={this.state.currPos}/>
        );         
    }

    async requestLocationPermission(){
            
        try{
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