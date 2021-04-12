import React, {Component} from 'react';
import { StyleSheet, SafeAreaView,View, TouchableOpacity, Text, Dimensions } from 'react-native';
import NaverMapView, {Circle, Marker, Path, Polyline, Polygon} from "react-native-nmap";
import SlidingUpPanel from 'rn-sliding-up-panel';
import MarkerDisplay from './MarkerDisplay';
import AnimatedHideView from 'react-native-animated-hide-view';
import Search from './Search';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Filter from './Filter';
import PathDisplay from './PathDisplay';
import ParkingMarker from './parkingMarker';
import Parking from './ParkingControlArea.json';
import CctvMarker from './cctvMarker';
window = Dimensions.get('window');

//추가 필요 기록
//맵 아이콘 css 수정 필요 zindex관련
//필터 페이지 조건 맵이랑 연동 필요
//콜백함수 동기화 필요 
//공영&민영 주차장 마커 색구분 할지
const mapView = React.createRef();
const P0 = {latitude: 37.564362, longitude: 126.977011};
const P1 = {latitude: 37.565051, longitude: 126.978567};
const P2 = {latitude: 37.565383, longitude: 126.976292};
export default class Main extends Component{
  constructor(props){
    super(props);
    this.state={
      indexNumber:0,
      isSearchVisible:false,
      isFilterVisible:false,
      searchedPlace:false,
      isListingSelected: false,
      ModalVisible: false,
      selectedParking:{},
      searchedPlaceData:{
        latitude:0,
        longitude:0,
      },
      currPos:{
        latitude:this.props.currPos.latitude,
        longitude:this.props.currPos.longitude,
        latitudeDelta: 0.00522,
        longitudeDelta: Dimensions.get("window").width / Dimensions.get("window").height * 0.00522
      },
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
        vehicle:true,
      },
    }
    this.toggleModal = this.toggleModal.bind(this)
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
                    vehicle:filterOption.vehicle,
    }},()=>{
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
      latitudeDelta: 0.00522,
      longitudeDelta: Dimensions.get("window").width / Dimensions.get("window").height * 0.00522
    }
    this.setState({
      currPos: {
        latitudeDelta: this.region.latitudeDelta,
        longitudeDelta: this.region.longitudeDelta,
        latitude: this.region.latitude,
        longitude: this.region.longitude
      },
      searchedPlace:true,
      searchedPlaceData: {
        latitude: this.region.latitude,
        longitude: this.region.longitude
      }
    })
  }
  onRegionChange(region) {
    this.setState({ currPos:region });
  }
  toggleModal(){
    this.setState({
      ModalVisible:true,
    });
  }
  settoggleModal(index){
    this.setState({
      ModalVisible:true,
      indexNumber:index,
    });
  }
  setSelectedParking(parking){
    this.setState({selectedParking:parking},()=>{
        this._panel.show(window.height * 0.38,1000);
      });
    }
      
  getCurrentPosition(){

    mapView.current.animateToRegion(
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
          {!this.state.isSearchVisible&&!this.state.isFilterVisible&&
            <View style={StyleSheet.absoluteFillObject}>
              <NaverMapView
                style={{width: '100%', height: '100%'}}
                showsMyLocationButton={true}
                center={{...P0, zoom: 16}}
                ref={mapView}
                >
            

                {this.props.parking.map((parking) => (
                        <Marker 
                          key= {parking.prkplceNo} 
                          onClick={()=>{this.setSelectedParking(parking)}} 
                          coordinate={{ latitude: parseFloat(parking.latitude), longitude: parseFloat(parking.longitude) }}
                          width={96} height={96}
                        >
                            <ParkingMarker 
                            price={parking.basicCharge}
                            basicTime={parking.basicTime}
                            />
                        </Marker> 
                ))}

                {/* {Parking.getIlglWkstInfo.item.map((item, index) => 
                <Marker 
                key={index} coordinate={{latitude: parseFloat(item.gpsY), longitude: parseFloat(item.gpsX)}}
                onPress={this.settoggleModal.bind(this,index)}
                >
                  <CctvMarker/>
                </Marker>
                )} */}
              {this.state.searchedPlace&&
                <Marker coordinate={{ latitude: this.state.searchedPlaceData.latitude, longitude:  this.state.searchedPlaceData.longitude}}/>
              }
            </NaverMapView>
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
          <PathDisplay ModalVisible={this.state.ModalVisible} setVisible={this.toggleModal} indexNumber={this.state.indexNumber}/>
              <SlidingUpPanel 
                ref={c => (this._panel = c)}
                style={styles.panel}
                backdropOpacity={0}
                snappingPoints={[
                window.height * 0.38,
                window.height * 0.7,
                window.height * 0.85,]}
              >              
              <MarkerDisplay 
                parking={this.state.selectedParking}
              />
            </SlidingUpPanel>                  
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
      zIndex:1,
    },
    openSearch:{
      zIndex:2,
      position:"absolute",
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
    }
  });