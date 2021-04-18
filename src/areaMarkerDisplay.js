import React, {Component} from 'react';
import { 
  StyleSheet, 
  SafeAreaView,
  View, 
  TouchableOpacity, 
  Text,
  Dimensions,
  ScrollView
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
window = Dimensions.get('window');

export default class AreaMarkerDisplay extends Component{

  render(){
    var year = this.props.area.jbYmd.substring(0,4)
    var month = this.props.area.jbYmd.substring(4,6)
    var day = this.props.area.jbYmd.substring(6,8)
    var violCase=0;
    var hourArray = []
    var countArray = []
    if(this.props.area.violTm.length == 3){
      var hour = this.props.area.violTm.substring(0,1)
      var minute = this.props.area.violTm.substring(1,3)
    }
    else if(this.props.area.violTm.length == 4){
      var hour = this.props.area.violTm.substring(0,2)
      var minute = this.props.area.violTm.substring(2,4)
    }
    else{
      violCase = 1
      var violTmArray = this.props.area.violTm.split('/')
      var violTmHourArray =[];
      var hour;
      var minute;

      if(violTmArray[0].length == 3){
        hour = violTmArray[0].substring(0,1)
        minute = violTmArray[0].substring(1,3)
      }
      else if(violTmArray[0].length == 4){
        hour = violTmArray[0].substring(0,2)
        minute = violTmArray[0].substring(2,4)
      }
      violTmArray.forEach(violTm => {
        if(violTm.length == 3){
          violTmHourArray.push(violTm.substring(0,1))
        }
        else if(violTm.length == 4){
          violTmHourArray.push(violTm.substring(0,2))
        }
      });
      var result = violTmHourArray.reduce((violTmHour,index)=> {
        violTmHour.set(index, (violTmHour.get(index)||0) +1) ;
        return violTmHour;
      },new Map()); 
      for (let [key, value] of result.entries()) {
        hourArray.push(`${key}시~${parseInt(key)+1}시`)
        countArray.push(`${value}회`)
      }
    }
    const violTmRender = () => {
      for (let index = 0; index < hourArray.length; index++) {
        return(
                  <View style={styles.areaBoxcontents}>
                  <Text style={styles.areaBoxText}>
                    {hourArray[index]}
                  </Text>
                  <Text style={styles.areaBoxData}>
                    {countArray[index]}
                  </Text>
                </View>
        )     
      }
    }
    return (
      <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity
                onPress={()=>{this.props.closeOverlay()}}
            >
                <FeatherIcon 
                  style={styles.xIcon} 
                  name='x' 
                  size={30} 
                  color='gray'
                />
            </TouchableOpacity> 
            <Text style={styles.headerText}>
                {this.props.area.ctlType}
            </Text>
          </View>
          <ScrollView style={styles.body}>
            <Text style={styles.firstTitleText}>
                단속장소
            </Text>
            <View style={styles.areaBox}>
                <Text style={styles.areaBoxContentStart}>
                    {this.props.area.violPlcNm}
                </Text>
            </View>
            <Text style={styles.titleText}>
                최근 단속 시간
            </Text>
            <View style={styles.areaBox}>
                <Text style={styles.areaBoxContentStart}>
                    {year}-{month}-{day} {hour}:{minute}
                </Text>
            </View>
            <Text style={styles.titleText}>
                단속시간
            </Text>
              <View style={styles.areaBox}>
                  {violCase == 0
                    ?<View style={styles.areaBoxcontents}>
                      <Text style={styles.areaBoxText}>
                        {hour}시~{parseInt(hour)+1}시
                      </Text>
                      <Text style={styles.areaBoxData}>
                        1회
                      </Text>
                    </View>
                  :violTmRender()
                  }
              </View>

            <Text style={styles.titleText}>
                어린이 보호구역 여부
            </Text>
            <View style={styles.areaBox}>
                <Text style={styles.areaBoxContentStart}>
                    {this.props.area.schoolZoneYn == 'N'
                    ?'X'
                    :'O'
                    }
                </Text>
            </View>
          </ScrollView>
      </SafeAreaView>
    )}
}
const styles = StyleSheet.create({
  container:{
        width:window.width,
        height:window.height*0.8,
        marginTop:window.height*0.2,
 },
  header: {
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#dee2e6',
    paddingTop:10,
    paddingLeft:10,
    backgroundColor:'#ffffff'
  },
  headerText:{
    fontSize:25,
    position:'absolute',
    alignSelf:'center',
    top:10,
  },
  firstTitleText:{
    fontSize:20,
    color:'#002166',
    paddingTop:10, 
    paddingBottom:10, 
    paddingLeft:30
  },
  titleText:{
    fontSize:20,
    color:'#002166',
    paddingTop:20, 
    paddingBottom:10, 
    paddingLeft:30
  },
  body:{
    height:window.height*0.8-50,
    paddingTop:10,
    backgroundColor:'#e2e2e2',
  },
  areaBox:{
    backgroundColor:'white',
    marginTop:10,
    borderRadius:10,
    marginLeft:20,
    marginRight:20
  },
  areaBoxContentStart:{
    fontSize:20,
    paddingBottom:15,
    paddingLeft:10 ,
    paddingTop:10,
  },
  areaBoxData:{
    paddingRight:10,
    fontSize:20,
  },
  areaBoxcontents: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: "#dee2e6",
  },
  areaBoxText:{
    fontSize:20,
    paddingBottom:15,
    paddingLeft:10 ,
    paddingTop:10,
  },
});