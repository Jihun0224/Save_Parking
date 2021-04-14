import React, {Component} from 'react';
import { 
  StyleSheet, 
  SafeAreaView,
  View, 
  TouchableOpacity, 
  Text,
  Dimensions,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

window = Dimensions.get('window');

export default class AreaMarkerDisplay extends Component{
  constructor(props){
    super(props);
    this.state={

      }
    }

  render(){
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
                head
            </Text>
          </View>
          <View style={styles.body}>
            <Text style={styles.firstTitleText}>
                단속장소
            </Text>
            <View style={styles.areaBox}>
                <Text style={styles.areaBoxContent}>
                    장소
                </Text>
            </View>
            <Text style={styles.titleText}>
                최근 단속 시간
            </Text>
            <View style={styles.areaBox}>
                <Text style={styles.areaBoxContent}>
                    xxxx-xx-xx
                </Text>
            </View>
            <Text style={styles.titleText}>
                단속시간
            </Text>
            <View style={styles.areaBox}>
                <Text style={styles.areaBoxContent}>
                    시간막대자리
                </Text>
            </View>
            <Text style={styles.titleText}>
                어린이 보호구역 여부
            </Text>
            <View style={styles.areaBox}>
                <Text style={styles.areaBoxContent}>
                    O or X
                </Text>
            </View>
          </View>
      </SafeAreaView>
    )}
}
const styles = StyleSheet.create({
  container:{
    width:window.width,
    height:window.height*0.8,
 },
  header: {
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#dee2e6',
    paddingTop:5,
    paddingLeft:10
  },
  headerText:{
    fontSize:25,
    position:'absolute',
    alignSelf:'center',
    top:5,
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
  areaBoxContent:{
    fontSize:20,
    paddingBottom:15,
    paddingLeft:10 ,
    paddingTop:10,
  }
});