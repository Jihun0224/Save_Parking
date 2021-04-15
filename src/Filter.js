import React, {Component} from 'react';
import { 
  StyleSheet, 
  SafeAreaView,
  View, 
  TouchableOpacity, 
  Text,
  ScrollView,
  Dimensions,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import ToggleSwitch from 'toggle-switch-react-native';
window = Dimensions.get('window');

export default class Filter extends Component{
  constructor(props){
    super(props);
    this.state={
        parkingAll:this.props.filterOption.parkingAll,
        public:this.props.filterOption.public,
        private:this.props.filterOption.private,
        free:this.props.filterOption.free,
        areaAll:this.props.filterOption.areaAll,
        cctv:this.props.filterOption.cctv,
        car:this.props.filterOption.car,
        smart:this.props.filterOption.smart,
      }
    }
    parkingAllCheck(){
      if(this.state.public && this.state.private && this.state.free){
        this.setState({parkingAll:true});
      }
      if(!this.state.public || !this.state.private || !this.state.free){
        this.setState({parkingAll:false});
      }
    }
    parkingAllOnChenage(){
      if(this.state.parkingAll == true){
        this.setState({parkingAll:false, public:false, private:false, free:false})
      }
      else{
        this.setState({parkingAll:true, public:true, private:true, free:true})
      }
    }
  publicOnChenage(){
    if(this.state.public == true){
      this.setState({public:false},()=>{
        this.parkingAllCheck();
      })
    }
    else{
      this.setState({public:true},()=>{
        this.parkingAllCheck();
      })
    }
  }
  privateOnChenage(){
    if(this.state.private == true){
      this.setState({private:false},()=>{
        this.parkingAllCheck();
      })
    }
    else{
      this.setState({private:true},()=>{
        this.parkingAllCheck();
      })
    }
  }
  freeOnChenage(){
    if(this.state.free == true){
      this.setState({free:false},()=>{
        this.parkingAllCheck();
      })
    }
    else{
      this.setState({free:true},()=>{
        this.parkingAllCheck();
      })
    }
  }
  areaAllCheck(){
    if(this.state.cctv && this.state.car && this.state.smart){
      this.setState({areaAll:true});
    }
    if(!this.state.cctv || !this.state.car || !this.state.smart){
      this.setState({areaAll:false});
    }
  }
  areaAllOnChenage(){
    if(this.state.areaAll == true){
      this.setState({areaAll:false, cctv:false, car:false, smart:false})
    }
    else{
      this.setState({areaAll:true, cctv:true, car:true, smart:true})
    }
  }
  cctvOnChenage(){
    if(this.state.cctv == true){
      this.setState({cctv:false},()=>{
        this.areaAllCheck();
      })
    }
    else{
      this.setState({cctv:true},()=>{
        this.areaAllCheck();
      })
    }
  }
  carOnChenage(){
    if(this.state.car == true){
      this.setState({car:false},()=>{
        this.areaAllCheck();
      })
    }
    else{
      this.setState({car:true},()=>{
        this.areaAllCheck();
      })
    }
  }
  smartOnChenage(){
    if(this.state.smart == true){
      this.setState({smart:false},()=>{
        this.areaAllCheck();
      })
    }
    else{
      this.setState({smart:true},()=>{
        this.areaAllCheck();
      })
    }
  }
  saveFilterOption(){
    this.filterOption = {
      parkingAll:this.state.parkingAll,
      public:this.state.public,
      private:this.state.private,
      free:this.state.free,
      areaAll:this.state.areaAll,
      cctv:this.state.cctv,
      car:this.state.car,
      smart:this.state.smart,
    }
    this.props.saveFilterOption(this.filterOption);
  }
  render(){
    return (
      <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity 
                onPress={()=>{this.props.closeFilter()}}
              >
                <FeatherIcon 
                  style={styles.xIcon} 
                  name='x' 
                  size={30} 
                  color='gray'
                />
            </TouchableOpacity> 
            <Text style={styles.headerText}>필터</Text>
          </View>

        <ScrollView style={styles.filterWindow}>
          <Text style={styles.titleText}>
            주차장
          </Text>

          <View style={styles.filterBox}>
            <View style={styles.filterBoxContents}>
                <Text style={styles.filterDivision}>
                  전체
                </Text>
                <ToggleSwitch
                style={styles.filterSwitch}
                isOn={this.state.parkingAll}
                onColor='#002166'
                offColor='gray'
                onToggle={()=>this.parkingAllOnChenage()}
                />
              </View>
            <View style={styles.filterBoxContents}>
              <Text style={styles.filterDivision}>
                공영
              </Text>
              <ToggleSwitch
                style={styles.filterSwitch}
                isOn={this.state.public}
                onColor='#002166'
                offColor='gray'
                onToggle={()=>this.publicOnChenage()}
              />
            </View>
            <View style={styles.filterBoxContents}>
                <Text style={styles.filterDivision}>
                  민영
                </Text>
                <ToggleSwitch
                style={styles.filterSwitch}
                isOn={this.state.private}
                onColor='#002166'
                offColor='gray'
                onToggle={()=>this.privateOnChenage()}
                />
              </View>
              <View style={styles.filterBoxContents}>
                <Text style={styles.filterDivision}>
                  무료
                </Text>
                <ToggleSwitch
                style={styles.filterSwitch}
                isOn={this.state.free}
                onColor='#002166'
                offColor='gray'
                onToggle={()=>this.freeOnChenage()}
                />
              </View>
          </View>
          <Text style={styles.titleText}>
            불법주차단속
          </Text>
          <View style={styles.filterBox}>
            <View style={styles.filterBoxContents}>
                <Text style={styles.filterDivision}>
                  전체
                </Text>
                <ToggleSwitch
                style={styles.filterSwitch}
                isOn={this.state.areaAll}
                onColor='#002166'
                offColor='gray'
                onToggle={()=>this.areaAllOnChenage()}
                />
              </View>
            <View style={styles.filterBoxContents}>
              <Text style={styles.filterDivision}>
                인력단속
              </Text>
              <ToggleSwitch
                style={styles.filterSwitch}
                isOn={this.state.car}
                onColor='#002166'
                offColor='gray'
                onToggle={()=>this.carOnChenage()}
              />
            </View>
            <View style={styles.filterBoxContents}>
                <Text style={styles.filterDivision}>
                  CCTV단속
                </Text>
                <ToggleSwitch
                style={styles.filterSwitch}
                isOn={this.state.cctv}
                onColor='#002166'
                offColor='gray'
                onToggle={()=>this.cctvOnChenage()}
                />
              </View>
              <View style={styles.filterBoxContents}>
              <Text style={styles.filterDivision}>
                스마트폰단속
              </Text>
              <ToggleSwitch
                style={styles.filterSwitch}
                isOn={this.state.smart}
                onColor='#002166'
                offColor='gray'
                onToggle={()=>this.smartOnChenage()}
              />
            </View>
          </View>
        </ScrollView>

        <View style={styles.applyButton}>
          <TouchableOpacity 
            onPress={()=>{this.saveFilterOption()}}
          >
            <Text style={styles.applyButtonText}>
              검색 필터 적용
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )}
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    width:window.width,
    height:window.height,
    backgroundColor:'#fff',
  },
  header: {
    height: 70,
    width:'100%',
    borderBottomWidth: 1,
    borderBottomColor: '#dee2e6',
    paddingLeft:20,
    paddingTop:20
  },
  headerText:{
    fontSize:25,
    position:'absolute',
    alignSelf:'center',
    top:20,
  },
  filterWindow:{
    width:'100%',
    paddingLeft:20,
    paddingRight:20,
    paddingTop:10,
    backgroundColor:'#e2e2e2',
  },
  titleText:{
    color:'gray',
    alignSelf:'center',
    fontSize:25,
    paddingTop:10
  },
  filterBox:{
    width:'100%',
    backgroundColor:'white',
    marginTop:10,
    borderRadius:10,
  },
  applyButton:{
    backgroundColor:'#002166',
    height:50
  },
  applyButtonText:{
    color:'#fff',
    alignSelf:'center',
    fontSize:25,
    paddingTop:8
  },
  filterBoxContents:{
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  filterDivision:{
    fontSize:20,
    paddingBottom:15,
    paddingLeft:10 ,
    paddingTop:10,
  },
  filterSwitch:{
    paddingRight:15,
  },
});