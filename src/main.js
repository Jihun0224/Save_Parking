import React, {Component} from 'react';
import { StyleSheet, SafeAreaView,View, TouchableOpacity, Text, Dimensions,ImageBackground } from 'react-native';
import NaverMapView, {Marker} from "react-native-nmap";
import SlidingUpPanel from 'rn-sliding-up-panel';
import ParkingMarkerDisplay from './parkingMarkerDisplay';
import AnimatedHideView from 'react-native-animated-hide-view';
import Search from './Search';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Filter from './filter';
import ParkingMarker from './parkingMarker';
import { Overlay } from 'react-native-elements';
import AreaMarkerDisplay from './areaMarkerDisplay';
import marker_png from './images/marker.png';
import CctvMarker from './cctvMarker';
import SmartPhoneMarker from './smartPhoneMarker';
import CarMarker from './carMarker';

window = Dimensions.get('window');

export default class Main extends Component{
  constructor(props){
    super(props);
    this.state={
      isSearchVisible:false,
      isFilterVisible:false,
      searchedPlace:false,
      isListingSelected: false,
      overlayVisible:false,
      selectedParking:{},
      selectedArea:{},
      searchedPlaceData:{
        latitude:0,
        longitude:0,
      },
      currPos:{
        latitude:this.props.currPos.latitude,
        longitude:this.props.currPos.longitude,
     },
     filterdParkingData:this.props.parking,
     filterdAreaData:this.props.area,
     zoom:18,
      history:[{
        name:'',
        id:'0',
        latitude:'',
        longitude:'',
        address_name:'',
      }],
      filterOption:{
        parkingAll:true,
        public:true,
        private:true,
        free:true,
        areaAll:true,
        cctv:true,
        car:true,
        smart:true,
      },
    }
  }

  closeSearch(){
    this.setState({isSearchVisible:false});
  }
  addHistory(place){
    this.setState(
      {history:[...this.state.history,
              {name:place.name, 
              id:place.id,
              longitude:place.longitude, 
              latitude:place.latitude,
              address_name:place.address_name}],
    })
  }
  closeFilter(){
    this.setState({isFilterVisible:false});
  }
  saveFilterOption(filterOption){
    this.setState({
      filterOption:{parkingAll:filterOption.parkingAll,
                    public:filterOption.public,
                    private:filterOption.private,
                    free:filterOption.free,
                    areaAll:filterOption.areaAll,
                    cctv:filterOption.cctv,
                    car:filterOption.car,
                    smart:filterOption.smart,
    }},()=>{
      if(filterOption.parkingAll == true){
        this.setState({filterdParkingData:this.props.parking})
      }
      else if(filterOption.public == true && filterOption.private == false && filterOption.free == false){
        let NewData = [];
        this.props.parking.forEach(parking => {
          if (parking.prkplceSe == '공영') {
            NewData.push(parking);
          }
        });
        this.setState({filterdParkingData:NewData})
      }
      else if(filterOption.public == true && filterOption.private == true && filterOption.free == false){
        let NewData = [];
          this.props.parking.forEach(parking => {
            if (parking.parkingchrgeInfo != '무료') {
              NewData.push(parking);
            }
          })
        this.setState({filterdParkingData:NewData})
      }
      else if(filterOption.public == true && filterOption.private == false && filterOption.free == true){
        let NewData = [];
        let NewData2 = [];
          this.props.parking.forEach(parking => {
            if (parking.parkingchrgeInfo == '무료') {
              NewData.push(parking);
            }
          })
          NewData.forforEach(parking => {
          if (parking.prkplceSe == '공영') {
            NewData2.push(parking);
          }
        })
        this.setState({filterdParkingData:NewData2})
      }
      else if(filterOption.public == false && filterOption.private == true && filterOption.free == false){
        let NewData = [];
          this.props.parking.forEach(parking => {
            if (parking.prkplceSe != '공영') {
              NewData.push(parking);
            }
          })
        this.setState({filterdParkingData:NewData})
      }
      else if(filterOption.public == false && filterOption.private == true && filterOption.free == true){
        let NewData = [];
        let NewData2 = [];
          this.props.parking.forEach(parking => {
            if (parking.parkingchrgeInfo == '무료') {
              NewData.push(parking);
            }
          })

          NewData.forEach(parking => {
          if (parking.prkplceSe != '공영') {
            NewData2.push(parking);
          }
        })
        this.setState({filterdParkingData:NewData2})
      }
      else if(filterOption.public == false && filterOption.private == false && filterOption.free == true){
        let NewData = [];
          this.props.parking.forEach(parking => {
            if (parking.parkingchrgeInfo == '무료') {
              NewData.push(parking);
            }
          })
        this.setState({filterdParkingData:NewData})
      }
      else{
        this.setState({filterdParkingData:[]})
      }

      if(filterOption.areaAll == true){
        this.setState({filterdAreaData:this.props.area})
      }
      else if(filterOption.cctv == true && filterOption.car == false && filterOption.smart == false){
        let NewData = [];
        this.props.area.forEach(area => {
          if (area.ctlType!= '스마트폰단속'&&area.ctlType!= '인력단속') {
            NewData.push(area);
          }
        });
        this.setState({filterdAreaData:NewData})
      }
      else if(filterOption.cctv == true && filterOption.car == true && filterOption.smart == false){
        let NewData = [];
        this.props.area.forEach(area => {
          if (area.ctlType != '스마트폰단속') {
            NewData.push(area);
          }
        });
        this.setState({filterdAreaData:NewData})
      }
      else if(filterOption.cctv == true && filterOption.car == false && filterOption.smart == true){
        let NewData = [];
        this.props.area.forEach(area => {
          if (area.ctlType != '인력단속') {
            NewData.push(area);
          }
        });
        this.setState({filterdAreaData:NewData})
      }
      else if(filterOption.cctv == false && filterOption.car == true && filterOption.smart == false){
        let NewData = [];
        this.props.area.forEach(area => {
          if (area.ctlType == '인력단속') {
            NewData.push(area);
          }
        });
        this.setState({filterdAreaData:NewData})
      }
      else if(filterOption.cctv == false && filterOption.car == true && filterOption.smart == true){
        let NewData = [];
        this.props.area.forEach(area => {
          if (area.ctlType == '인력단속'||area.ctlType == '스마트폰단속') {
            NewData.push(area);
          }
        });
        this.setState({filterdAreaData:NewData})
      }
      else if(filterOption.cctv == false && filterOption.car == false && filterOption.smart == true){
        let NewData = [];
        this.props.area.forEach(area => {
          if (area.ctlType == '스마트폰단속') {
            NewData.push(area);
          }
        });
        this.setState({filterdAreaData:NewData})
      }
      else{
        this.setState({filterdAreaData:[]})
      }
      this.closeFilter();
    })
  }
  HistoryRemove(newData){
    this.setState({history:newData})
  }
  setSearchedPlace(searchedPlace){
    this.region = {
      latitude: searchedPlace.latitude,
      longitude: searchedPlace.longitude,
    }
    this.setState({
      currPos: {
        latitude: this.region.latitude,
        longitude: this.region.longitude
      },
      zoom:15,
      searchedPlace:true,
      searchedPlaceData: {
        latitude: this.region.latitude,
        longitude: this.region.longitude
      }
    })
  }

  closeOverlay(){
    this.setState({overlayVisible:false})
  }
  setSelectedParking(parking){
    this.setState({zoom:17},()=>{
      this._map.animateToCoordinate(
        {
          latitude: parking.latitude,
          longitude: parking.longitude,
        },
        1000
      )
    })

    this.setState({selectedParking:parking},()=>{
        this._panel.show(window.height * 0.38,1000);
      });
  }
  setSelectedArea(area){
    this.setState({zoom:18},()=>{
      this._map.animateToCoordinate(
        {
          latitude: area.latitude,
          longitude: area.longitude,
        },
        1000
      )
    })

    this.setState({selectedArea:area},()=>{
      this.setState({overlayVisible:true})
      });
  }      
  getCurrentPosition(){
        this._map.animateToCoordinate(
          {
            latitude: this.props.currPos.latitude,
            longitude: this.props.currPos.longitude,
          },
          1000
        )
  }

  render(){
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.map}>
          {!this.state.isSearchVisible&&!this.state.isFilterVisible&&
            <View style={StyleSheet.absoluteFillObject}>
              <NaverMapView
                ref={component => this._map = component}
                style={{width: '100%', height: '100%'}}
                center={{...this.state.currPos, zoom: this.state.zoom}}
              >
                <Marker 
                  coordinate={{ 
                    latitude: this.props.currPos.latitude, 
                    longitude: this.props.currPos.longitude}}
                  width={30} 
                  height={40}
                  pinColor='blue'
                />

                {this.state.filterdParkingData.map((parking,index) => (
                        <Marker 
                          key= {index} 
                          onClick={()=>{this.setSelectedParking(parking)}} 
                          coordinate={{ 
                            latitude: parseFloat(parking.latitude), 
                            longitude: parseFloat(parking.longitude)}}
                          width={30} 
                          height={30}
                        >
                            {/* <ParkingMarker 
                              basicCharge={parking.basicCharge}
                              basicTime={parking.basicTime}
                              parkingchrgeInfo={parking.parkingchrgeInfo}
                              monthCmmtkt={parking.monthCmmtkt}
                            /> */}
                        </Marker> 
                ))}
            {this.state.filterdAreaData.map((area,index) => (
                        <Marker 
                          key= {index} 
                          onClick={()=>{this.setSelectedArea(area)}} 
                          coordinate={{ 
                            latitude: parseFloat(area.latitude), 
                            longitude: parseFloat(area.longitude)}}
                          width={30} 
                          height={30}
                        >
                          {/* {area.ctlType == '인력단속'
                          ?<CarMarker/>
                          :area.ctlType == '스마트폰단속'
                            ?<SmartPhoneMarker/>
                            :<CctvMarker/>
                          } */}
                        </Marker> 
                ))}               
              {this.state.searchedPlace&&
                <Marker 
                coordinate={{ 
                  latitude:this.state.searchedPlaceData.latitude, 
                  longitude:this.state.searchedPlaceData.longitude}}
                width={96} 
                height={96}
                >
                  <View>
                    <ImageBackground
                      resizeMode="contain"
                      source={marker_png}
                      style={styles.imageBackground}
                      imageStyle={{tintColor:"#ff0000"}}/>
                  </View>
                </Marker>
              }
            </NaverMapView>
            <View style={styles.openSearch}>
                <TouchableOpacity 
                  onPress={()=>{
                    this.setState({isSearchVisible:true});
                  }}>
                  <Text style={styles.openSearchText}>
                    <Icon name="location" size={24} color="gray"/>
                    장소를 입력해주세요.
                  </Text>
                </TouchableOpacity>
              </View>
                  <TouchableOpacity
                    style={styles.myLocation}
                    onPress={() => {
                      this.getCurrentPosition()
                    }}
                  >
                <MaterialIcons 
                  name='crosshairs-gps' 
                  style={{...styles.icon,backgroundColor: 'rgba(255, 255, 255, 0.6)',color: 'rgba(0, 0, 0, 0.6)'}}
                  size={25} 
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={()=>{
                  this.setState({isFilterVisible:true});
                }}
                style={styles.filter}
                >
                  <MaterialIcons
                    name="filter-outline"
                    style={{...styles.icon,backgroundColor: 'rgba(255, 255, 255, 0.6)',color: 'rgba(0, 0, 0, 0.6)'}}
                    size={25}
                  />
              </TouchableOpacity>
              
            </View>
          }
          {this.state.isSearchVisible&&
            <Search 
              closeSearch={this.closeSearch.bind(this)}
              setSearchedPlace={this.setSearchedPlace.bind(this)}
              isSearchVisible={this.state.isSearchVisible}
              currPos={this.props.currPos}
              history={this.state.history}
              addHistory={this.addHistory.bind(this)}
              HistoryRemove={this.HistoryRemove.bind(this)}
            />
          }
            <AnimatedHideView
              visible={this.state.isFilterVisible}
              style={styles.filter_window}
            >
            <Filter 
              closeFilter={this.closeFilter.bind(this)}
              filterOption={this.state.filterOption}
              saveFilterOption={this.saveFilterOption.bind(this)}
            />
          </AnimatedHideView>
              <SlidingUpPanel 
                ref={c => (this._panel = c)}
                style={styles.panel}
                backdropOpacity={0}
                snappingPoints={[
                window.height * 0.38,
                window.height * 0.7,
                window.height * 0.85,]}
              >              
              <ParkingMarkerDisplay 
                parking={this.state.selectedParking}
              />
            </SlidingUpPanel>
            <Overlay 
              visible={this.state.overlayVisible}
              overlayStyle={styles.overlay}
              backdropStyle={styles.overlaybackdrop}
              area={this.state.selectedArea}
              onBackdropPress={()=>{
                this.closeOverlay()
              }}
            >
              <AreaMarkerDisplay
                area = {this.state.selectedArea}
                closeOverlay={this.closeOverlay.bind(this)}
              />
            </Overlay>                  
        </View>
      </SafeAreaView>
    )}
}
const styles = StyleSheet.create({
    container: {
      flex: 1,      
    },
    map:{
      flex: 1,      
    },
    panel:{
      position:'absolute',
      zIndex:3,
    },
    openSearch:{
      position:'absolute',
      zIndex:2,
      top:10,
      width:window.width-30,
      height:60,
      backgroundColor:'#fff',
      alignSelf:'center',
      borderRadius:10,
      borderWidth: 1,
      borderColor:'gray'
    },
    openSearchText:{ 
      fontSize:24,
      color:'gray',
      marginTop:10,
      marginLeft:10
    },
    filter_window:{
      backgroundColor:'#fff',
      width:'100%',
      height:'100%'
    },
    icon:{
      width:38,
      height:38,
      paddingLeft:6,
      paddingTop:6,
      borderRadius:5
    },
    filter:{
      position:'absolute',
      top:150,
      zIndex:2,
      left:window.width-50,
    },
    myLocation:{
      position:'absolute',
      top:110,
      zIndex:2,
      left:window.width-50,
    },
    imageBackground:{
      width:100,
      height:55,
      justifyContent: 'center',
      alignItems: 'center',
    },
    overlay:{
      borderTopLeftRadius:20,
      borderTopRightRadius:20,
      paddingLeft:0,
      paddingRight:0,
      marginTop:window.height*0.2
    },
    overlaybackdrop:{
      opacity:0.1
    }
  });