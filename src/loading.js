import React,{Component} from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  ActivityIndicator, 
  Dimensions 
} from 'react-native';
import axios from 'axios';
window = Dimensions.get('window');

export default class Loading extends Component{
  constructor(props){
    super(props);
    this.state={
        parking:[],
    }
  }
componentDidMount(){
  axios.get('http://api.data.go.kr/openapi/tn_pubr_prkplce_info_api?serviceKey=EFoCqYt%2BLkiQlVlyq5YnUJ85Rlw80roqfZCNNS4sMikQ4aL4vFP3kDp7wxo9WD1O17l1SHxG3Wq45XyxMZLLFA%3D%3D&type=json&instt_code=3280000')
  .then((Response)=>{
    return parseInt(Response.data.response.body.totalCount)
  })
  .then((totalCount)=>{
    axios.get(`http://api.data.go.kr/openapi/tn_pubr_prkplce_info_api?serviceKey=EFoCqYt%2BLkiQlVlyq5YnUJ85Rlw80roqfZCNNS4sMikQ4aL4vFP3kDp7wxo9WD1O17l1SHxG3Wq45XyxMZLLFA%3D%3D&type=json&numOfRows=10&instt_code=3280000`)
    .then((Response)=>{
      this.props.setParkingData(Response);
    })
  })
  .catch((Error)=>{
      console.log(Error)
  })

}

  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          거기 멈춰
        </Text>
        <ActivityIndicator 
          style={styles.indicator}
          size="large" 
          color="#fff" 
        />
      </View>
    );
}
}
const styles = StyleSheet.create({
    container: {
      flex: 2,
      justifyContent:"flex-start",
      paddingHorizontal:30,
      paddingVertical:100,
      backgroundColor: "#002166",

    },
    text:{
        color:"#fff",
        fontSize: 30,
    },
    indicator:{
      position:'absolute',
      top:window.height/2,
      left:window.width/2
    }
  });