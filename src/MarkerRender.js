import React,{Component} from 'react';
import {View} from 'react-native';
import { Marker} from 'react-native-maps';
import CustomMarker from './CustomMarker';
import axios from 'axios';
const API_KEY = ''

export default class MarkerRender extends Component{
    constructor(props){
        super(props);
        this.state={
            parking:[],
        }
      }
      UNSAFE_componentWillMount(){
        var url = 'http://api.data.go.kr/openapi/tn_pubr_prkplce_info_api'; /*URL*/
        var queryParams = '?' + encodeURIComponent('ServiceKey') + '='+API_KEY; /*Service Key*/
        queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('100'); /**/
        queryParams += '&' + encodeURIComponent('type') + '=' + encodeURIComponent('json'); /**/
        queryParams += '&' + encodeURIComponent('instt_code') + '=' + encodeURIComponent('3280000'); /*부산광역시 영도구*/
        axios.get('http://api.data.go.kr/openapi/tn_pubr_prkplce_info_api?serviceKey=API_KEY&type=json&instt_code=3280000')
        .then((Response)=>{
          for(let i =0; i<Response.data.response.body.items.length; i++){
            this.setState({parking:[...this.state.parking,
              Response.data.response.body.items[i]]
            })
          }
        })
        .catch((Error)=>{
            console.log(Error)
        })
        
    }

    render(){
        return(
               <View>
                    {this.state.parking.map((parking) => (
                            <Marker key= {parking.prkplceNo} onPress={()=>{this.props.setSelectedParking(parking)}} coordinate={{ latitude: parseFloat(parking.latitude), longitude: parseFloat(parking.longitude) }}>
                                <CustomMarker price={parking.basicCharge}/>
                            </Marker> 
                    ))}
               </View>
        )
    }
}