import React,{Component} from 'react'
import {SafeAreaView,View, Text, ScrollView,Linking, Button} from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FeatherIcons from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {TouchableOpacity} from 'react-native-gesture-handler';

class MarkerDisplay extends Component {

  handlePress(){
    
    const currPos ={latitude:128.6402609, longitude:35.2538433}
    const place_name = "창원대"
    const url = `geo:${currPos.latitude},${currPos.longitude}?q=${place_name}`
    Linking.canOpenURL(url)
    .then(supported => {
      if (!supported) {
        console.log('Unsupported URL: ' + url)
      } else {
        return Linking.openURL(url)
      }
    }).catch(err => console.error('An error occurred ', err))
    }

  render() {
    return (
      <SafeAreaView style={styles.container}>
            <FeatherIcons style={styles.minusicon} name="minus" size={35} color="#dee2e6"/>
          <View style={styles.header}>
            <View style={styles.division_border}>
              <Text style={styles.division}>구분</Text>
            </View>
            <Text style={styles.header_text}>주차장 이름</Text>
              <View style={styles.naviIcon}>

                <TouchableOpacity onPress={() => this.handlePress()}>
                <MaterialIcons
                      name="assistant-direction"
                      size={45}
                      color="#1e90ff"
                    />
                </TouchableOpacity>
              </View>

          </View>
        
        <ScrollView style={styles.markerData}>
          <View style={styles.info_box}>
            <Text style={styles.main_info_box_text}>
              <Ionicons name="location-outline" size={24} color="gray"/>
              주소
            </Text>
            <Text style={styles.main_info_box_text}>
              <MaterialIcons name="payment" size={24} color="gray"/>
              주차요금
            </Text>
            <Text style={styles.main_info_box_text}>
              <Ionicons name="time-outline" size={24} color="gray"/>
              운영시간
            </Text>
            <Text style={styles.main_info_box_text}>
              <Ionicons name="call-outline" size={24} color="gray"/>
              전화번호
            </Text>
          </View>

              <Text style={styles.info_box_title}>
                시간 요금
              </Text>

              <View style={styles.info_box}>
                <View style={styles.info_box_contents}>
                    <Text style={styles.info_box_text}>
                      기본요금
                    </Text>
                    <Text style={styles.info_box_data}>
                      data
                    </Text>
                </View>
                <View style={styles.info_box}>
                  <View style={styles.info_box_contents}>
                    <Text style={styles.info_box_text}>
                      추가요금
                    </Text>
                    <Text style={styles.info_box_data}>
                      data
                    </Text>
                  </View>
                </View>
              </View>

            <Text style={styles.info_box_title}>
                일주차 요금
              </Text>
              <View style={styles.info_box}>
                <View style={styles.info_box_contents}>
                    <Text style={styles.info_box_first_text}>
                      기본
                    </Text>
                    <Text style={styles.info_box_data}>
                      data
                    </Text>
                </View>
                <View style={styles.info_box}>
                  <View style={styles.info_box_contents}>
                    <Text style={styles.info_box_text}>
                      적용시간
                    </Text>
                    <Text style={styles.info_box_data}>
                      data
                    </Text>
                  </View>
                </View>
              </View>

            <Text style={styles.info_box_title}>
                월주차 요금
              </Text>
              <View style={styles.info_box}>
                <View style={styles.info_box_contents}>
                    <Text style={styles.info_box_first_text}>
                      기본
                    </Text>
                    <Text style={styles.info_box_data}>
                      data
                    </Text>
                </View>
              </View>

            <Text style={styles.info_box_title}>
                운영시간
              </Text>
              <View style={styles.info_box}>
                <View style={styles.info_box_contents}>
                    <Text style={styles.info_box_first_text}>
                      평일
                    </Text>
                    <Text style={styles.info_box_data}>
                      data
                    </Text>
                </View>
                <View style={styles.info_box}>
                  <View style={styles.info_box_contents}>
                    <Text style={styles.info_box_text}>
                      토요일
                    </Text>
                    <Text style={styles.info_box_data}>
                      data
                    </Text>
                  </View>
                </View>
                <View style={styles.info_box}>
                  <View style={styles.info_box_contents}>
                    <Text style={styles.info_box_text}>
                      일요일
                    </Text>
                    <Text style={styles.info_box_data}>
                      data
                    </Text>
                  </View>
                </View>
                <View style={styles.info_box}>
                  <View style={styles.info_box_contents}>
                    <Text style={styles.info_box_text}>
                      공휴일
                    </Text>
                    <Text style={styles.info_box_data}>
                      data
                    </Text>
                  </View>
                </View>
              </View>

            <Text style={styles.info_box_title}>
              부제시행구분<Text style={styles.info_box_data}>data</Text>
              </Text>
            <View style={styles.info_box}>
              <Text style={styles.info_box_text}>
                O or X
              </Text>
            </View>
              <Text style={styles.copyright_text}>
              본 저작물은 공공데이터활용지원센터에서 15년 작성하여 개방한 
              전국주차장정보표준데이터을 이용하였으며, 해당 저작물은 공공데이터활용지원센터에서 
              무료로 내려받으실 수 있습니다.
              </Text>
        </ScrollView>
      </SafeAreaView>

    )
  }
}

const styles = {
  container: {
    flex: 1,
    zIndex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    width:'100%',
  },
  division_border:{
    borderRadius: 25,
    borderWidth: 2,
    width:40,
    height:40,
    position:"absolute",
    top:-5,
    left:10,
    borderColor:"#dee2e6"
  },
  division:{

    fontSize:15,
    fontWeight: 'bold',
    position:"absolute",
    top:8,
    left:4,
    color: "#777B7E"
  },
  header: {
    height: 50,
    backgroundColor: 'white',
    width:'100%',
    borderBottomWidth: 1,
    borderBottomColor: "#dee2e6",
  },
  header_text:{
    fontSize:22,
    position:"absolute",
    left: 60,
  },
  minusicon:{
    marginTop:-5
  },
  naviIcon:{
    position: "absolute",
    top: -10,
    right:5,
    alignSelf: 'flex-end',
  },
  markerData:{
    width:'100%',
    paddingLeft:20,
    paddingRight:20,
    paddingTop:10,
    backgroundColor:'#dddfdf',
  },
  info_box:{
    backgroundColor:'white',
    borderRadius:10
  },
  main_info_box_text:{
    width:'100%',
    borderBottomWidth: 1,
    borderBottomColor: "#dee2e6",
    fontSize:20,
    paddingBottom:10,
    paddingLeft:10 ,
    paddingTop:10,
  },
  info_box_title:{
    fontSize:20,
    color:'#002166',
    paddingTop:20, 
    paddingBottom:10, 
    paddingLeft:15
  },
  info_box_text:{
    fontSize:20,
    paddingBottom:15,
    paddingLeft:10 ,
    paddingTop:10,
  },
  info_box_first_text:{
    fontSize:20,
    paddingBottom:10,
    paddingTop:10,
    paddingLeft:10,
  },
  info_box:{
    backgroundColor:'white',
    borderRadius:10
  },
  info_box_data:{
    paddingRight:10,
    fontSize:20,
  },
  info_box_contents: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: "#dee2e6",
  },
  copyright_text:{
    paddingTop:50,
    paddingBottom:60
  },
}

export default MarkerDisplay;