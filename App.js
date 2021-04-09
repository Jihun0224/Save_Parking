import React, {Component} from 'react';
import {PermissionsAndroid} from 'react-native';
import Main from "./src/main";
import Geolocation from 'react-native-geolocation-service';
import Loading from './src/loading';
import database from '@react-native-firebase/database';
 
export default class App extends Component{
 
    constructor(props){
        super(props);
        this.state={
            currPos:{latitude:35.2538433 , longitude:128.6402609}, //최초 좌표객체[위도,경도]
            isGetPositionLoading: true,
            isParkingDataLoading:true,
            parking:[],
            Loading:true,
            data:[],
        }
    }
    //DB 연동 Test
    getData = () => {
        database()
        .ref(`/`)
        .once('value', function(snapshot) {  snapshot.forEach(function(userSnapshot) {
                const id = userSnrapshot.key;
                const userData = userSnapshot.val();
            console.log(userData.name);
});});
      }
    setParkingData(Response){
        for(let i =0; i<Response.data.response.body.items.length; i++){
            this.setState({parking:[...this.state.parking,
              Response.data.response.body.items[i]]
            })
        }
        this.setState({isParkingDataLoading:false})
    }
    async componentDidMount(){
        this.getData()
        await this.requestLocationPermission()
     }
     
    render(){
        return(
          this.state.isGetPositionLoading == false&&this.state.isParkingDataLoading == false
          ?<Main 
            parking={this.state.parking}
            currPos={this.state.currPos}
           />
          :<Loading 
            setParkingData={this.setParkingData.bind(this)}
           />
        );         
    }

    async requestLocationPermission(){
            
        try{
            const granted=await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
 
            if(granted== PermissionsAndroid.RESULTS.GRANTED){
                Geolocation.getCurrentPosition( (position)=>{
                    this.setState({currPos: position.coords},()=>{
                        this.setState({isGetPositionLoading:false});
                    });
                }, 
                (error)=>{
                    alert('error : '+error.message);
                });
            }else{
                alert('위치정보 사용을 거부하셨습니다.\n앱의 기능사용이 제한됩니다.');
                this.setState({isGetPositionLoading:false});

            }
        }catch(err){alert('퍼미션 작업 에러');}
    }
}