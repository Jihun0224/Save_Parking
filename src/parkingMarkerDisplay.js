import React,{Component} from 'react'
import {SafeAreaView,View, Text, ScrollView,Linking, Button} from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FeatherIcons from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {TouchableOpacity} from 'react-native-gesture-handler';

class ParkingMarkerDisplay extends Component {

  handlePress(){
    
    const currPos ={latitude:parseFloat(this.props.parking.latitude), longitude:parseFloat(this.props.parking.longitude)}
    const url = `geo:${currPos.latitude},${currPos.longitude}?q=${this.props.parking.prkplceNm}`
    Linking.canOpenURL(url)
    .then(supported => {
      if (!supported) {
        alert('Unsupported URL: ' + url)
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
              <Text style={styles.division}>
                {this.props.parking.prkplceSe}
              </Text>
            </View>
            <Text style={styles.header_text}>
              {this.props.parking.prkplceNm}
            </Text>
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
              {this.props.parking.lnmadr}
            </Text>
            {this.props.parking.parkingchrgeInfo == '??????'
            ?<></>
            :
            <Text style={styles.main_info_box_text}>
              <MaterialIcons name="payment" size={24} color="gray"/>

              {this.props.parking.basicTime =='' && this.props.parking.monthCmmtkt == ''
              ?"????????????"
              :this.props.parking.basicTime ==''
                ?"??? "+this.props.parking.monthCmmtkt+"???"
                :this.props.parking.basicTime+"???/"+this.props.parking.basicCharge+"???"
              }
            </Text>
            }
            <Text style={styles.main_info_box_text}>
              <Ionicons name="time-outline" size={24} color="gray"/>
              {this.props.parking.weekdayOperOpenHhmm}~{this.props.parking.weekdayOperColseHhmm}
            </Text>
            {this.props.parking.phoneNumber ==''
            ?<Text style={styles.phoneNumber}>
              <Ionicons name="call-outline" size={24} color="gray"/>
              ????????????
             </Text>
            :<TouchableOpacity onPress={()=>Linking.openURL(`tel:${this.props.parking.phoneNumber}`)}>
              <Text style={styles.phoneNumber}>
                <Ionicons name="call-outline" size={24} color="gray"/>
                {this.props.parking.phoneNumber}
              </Text>
            </TouchableOpacity>
            }
          </View>
          <Text style={styles.info_box_title}>
                ??????????????????
          </Text>
              <View style={styles.info_box}>
                <View style={styles.info_box_contents}>
                  <Text style={styles.info_box_text}/>
                  {this.props.parking.parkingchrgeInfo == '??????'
                  ?<Text style={styles.info_box_data}>-</Text>
                  :<Text style={styles.info_box_data}>
                    {this.props.parking.metpay ==''|| this.props.parking.metpay ==undefined
                    ?"????????????"
                    :this.props.parking.metpay
                    }
                   </Text>
                  }
                </View>
              </View>
              <Text style={styles.info_box_title}>
                ???????????????
              </Text>

              <View style={styles.info_box}>
                <View style={styles.info_box_contents}>
                    <Text style={styles.info_box_text}/>
                    
                    <Text style={styles.info_box_data}>
                      {this.props.parking.prkcmprt ==''|| this.props.parking.prkcmprt ==undefined
                      ?"????????????"
                      :this.props.parking.prkcmprt
                      }
                    </Text>
                </View>
              </View>
              <Text style={styles.info_box_title}>
                ?????? ??????
              </Text>

              <View style={styles.info_box}>
                <View style={styles.info_box_contents}>
                    <Text style={styles.info_box_text}>
                      ????????????
                    </Text>
                    <Text style={styles.info_box_data}>
                    {this.props.parking.parkingchrgeInfo == '??????'
                    ?<Text style={styles.info_box_data}>-</Text>
                    :<Text style={styles.info_box_data}>
                      {this.props.parking.basicTime =='' || this.props.parking.basicTime ==undefined
                      ?"????????????"
                      :this.props.parking.basicTime+"???/"+this.props.parking.basicCharge+"???"
                      }
                    </Text>
                    }
                    </Text>
                </View>
                <View style={styles.info_box}>
                  <View style={styles.info_box_contents}>
                    <Text style={styles.info_box_text}>
                      ????????????
                    </Text>
                    <Text style={styles.info_box_data}>
                    {this.props.parking.parkingchrgeInfo == '??????'
                    ?<Text style={styles.info_box_data}>-</Text>
                    :<Text style={styles.info_box_data}>
                    {this.props.parking.addUnitTime ==''|| this.props.parking.addUnitTime ==undefined
                      ?"????????????"
                      :this.props.parking.addUnitTime+"???/"+this.props.parking.addUnitCharge+"???"
                      }
                    </Text>
                    }
                    </Text>
                  </View>
                </View>
              </View>

            <Text style={styles.info_box_title}>
                ????????? ??????
              </Text>
              <View style={styles.info_box}>
                <View style={styles.info_box_contents}>
                    <Text style={styles.info_box_first_text}>
                      ??????
                    </Text>
                    <Text style={styles.info_box_data}>
                    {this.props.parking.parkingchrgeInfo == '??????'
                    ?<Text style={styles.info_box_data}>-</Text>
                    :<Text style={styles.info_box_data}>
                    {this.props.parking.dayCmmtkt ==''|| this.props.parking.dayCmmtkt ==undefined
                      ?"????????????"
                      :this.props.parking.dayCmmtkt+"???"
                      }
                    </Text>
                    }
                    </Text>
                </View>
                <View style={styles.info_box}>
                  <View style={styles.info_box_contents}>
                    <Text style={styles.info_box_text}>
                      ????????????
                    </Text>
                    <Text style={styles.info_box_data}>
                    {this.props.parking.parkingchrgeInfo == '??????'
                    ?<Text style={styles.info_box_data}>-</Text>
                    :<Text style={styles.info_box_data}>
                    {this.props.parking.dayCmmtktAdjTime ==''|| this.props.parking.dayCmmtktAdjTime ==undefined
                      ?"????????????"
                      :this.props.parking.dayCmmtktAdjTime >1440 
                        ?"24??????"
                        :this.props.parking.dayCmmtktAdjTime > 24
                          ?this.props.parking.dayCmmtktAdjTime /60 +"??????"
                          :this.props.parking.dayCmmtktAdjTime+"??????"
                      }
                    </Text>
                    }
                    </Text>
                  </View>
                </View>
              </View>

            <Text style={styles.info_box_title}>
                ????????? ??????
              </Text>
              <View style={styles.info_box}>
                <View style={styles.info_box_contents}>
                    <Text style={styles.info_box_first_text}>
                      ??????
                    </Text>
                    <Text style={styles.info_box_data}>
                    {this.props.parking.parkingchrgeInfo == '??????'
                    ?"-"
                    :this.props.parking.monthCmmtkt ==''|| this.props.parking.monthCmmtkt ==undefined
                      ?"????????????"
                      :this.props.parking.monthCmmtkt+"???"
                    }
                    </Text>
                </View>
              </View>

            <Text style={styles.info_box_title}>
                ????????????
              </Text>
              <View style={styles.info_box}>
                <View style={styles.info_box_contents}>
                    <Text style={styles.info_box_first_text}>
                      ??????
                    </Text>
                    <Text style={styles.info_box_data}>
                    {this.props.parking.weekdayOperOpenHhmm==''|| this.props.parking.weekdayOperOpenHhmm ==undefined
                      ?"????????????"
                      :this.props.parking.weekdayOperOpenHhmm+"~"+this.props.parking.weekdayOperColseHhmm
                      }
                    </Text>
                </View>
                <View style={styles.info_box}>
                  <View style={styles.info_box_contents}>
                    <Text style={styles.info_box_text}>
                      ?????????
                    </Text>
                    <Text style={styles.info_box_data}>
                      {this.props.parking.satOperOperOpenHhmm==''|| this.props.parking.satOperOperOpenHhmm ==undefined
                      ?"????????????"
                      :this.props.parking.satOperOperOpenHhmm+"~"+this.props.parking.satOperCloseHhmm
                      }
                    </Text>
                  </View>
                </View>
                <View style={styles.info_box}>
                  <View style={styles.info_box_contents}>
                    <Text style={styles.info_box_text}>
                      ?????????
                    </Text>
                    <Text style={styles.info_box_data}>
                      {this.props.parking.holidayOperOpenHhmm==''|| this.props.parking.holidayOperOpenHhmm ==undefined
                      ?"????????????"
                      :this.props.parking.holidayOperOpenHhmm+"~"+this.props.parking.holidayCloseOpenHhmm
                      }
                    </Text>
                  </View>
                </View>
              </View>

              <Text style={styles.info_box_title}>
                ????????????
              </Text>
              <View style={styles.info_box}>
                <View style={styles.info_box_contents}>
                    <Text style={styles.info_box_text}/>
                      <Text style={styles.info_box_data}>
                        {this.props.parking.spcmnt ==''|| this.props.parking.spcmnt ==undefined
                        ?"??????"
                        :this.props.parking.spcmnt
                        }
                      </Text>
                </View>
              </View>
            <Text style={styles.info_box_title}>
              ????????????
              </Text>
              <View style={styles.info_box}>
                <View style={styles.info_box_contents}>
                    <Text style={styles.info_box_text}/>
                    
                    <Text style={styles.info_box_data}>
                      {this.props.parking.enforceSe ==''|| this.props.parking.enforceSe ==undefined
                      ?"????????????"
                      :this.props.parking.enforceSe
                      }
                    </Text>
                </View>
              </View>
              <Text style={styles.copyright_text}>
              ??? ???????????? ??????????????????????????????????????? 15??? ???????????? ????????? 
              ??????????????????????????????????????? ??????????????????, ?????? ???????????? ??????????????????????????????????????? 
              ????????? ??????????????? ??? ????????????.
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
  phoneNumber:{
    width:'100%',
    borderBottomWidth: 1,
    borderBottomColor: "#dee2e6",
    fontSize:20,
    paddingBottom:10,
    paddingLeft:10 ,
    paddingTop:10,
    color:'#002166'
  }
}

export default ParkingMarkerDisplay;