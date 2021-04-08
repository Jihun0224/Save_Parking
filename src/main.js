import React, {Component} from 'react';
import { StyleSheet, SafeAreaView,View, TouchableOpacity, Text, Dimensions } from 'react-native';
import { Marker,PROVIDER_GOOGLE } from 'react-native-maps';
import MapView from "react-native-map-clustering";
import SlidingUpPanel from 'rn-sliding-up-panel';
import MarkerDisplay from './MarkerDisplay';
import AnimatedHideView from 'react-native-animated-hide-view';
import Search from './Search';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Filter from './Filter';
import PathDisplay from './PathDisplay';
import CustomMarker from './CustomMarker';
window = Dimensions.get('window');

//0407 추가 필요 기록
//맵 아이콘 css 수정 필요 zindex관련
//필터 페이지 조건 맵이랑 연동 필요
//콜백함수 동기화 필요 
//공영&민영 주차장 마커 색구분 할지

export default class Main extends Component{
  constructor(props){
    super(props);
    this.state={
      isSearchVisible:false,
      isFilterVisible:false,
      searchedPlace:false,
      isListingSelected: false,
      ModalVisible: false,
      panelVisible:false,
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
    }
  }
  onPressZoomOut() {
    this.region = {
      latitude: this.state.currPos.latitude,
      longitude: this.state.currPos.longitude,
      latitudeDelta: this.state.currPos.latitudeDelta * 10,
      longitudeDelta: this.state.currPos.longitudeDelta * 10
    }

    this.setState({
      currPos: {
        latitudeDelta: this.region.latitudeDelta,
        longitudeDelta: this.region.longitudeDelta,
        latitude: this.region.latitude,
        longitude: this.region.longitude
      }
    })
    this.map.animateToRegion(this.region, 100);
  }
  onPressZoomIn() {
    this.region = {
      latitude: this.state.currPos.latitude,
      longitude: this.state.currPos.longitude,
      latitudeDelta: this.state.currPos.latitudeDelta / 10,
      longitudeDelta: this.state.currPos.longitudeDelta / 10
    }
    this.setState({
      currPos: {
        latitudeDelta: this.region.latitudeDelta,
        longitudeDelta: this.region.longitudeDelta,
        latitude: this.region.latitude,
        longitude: this.region.longitude
      }
    })
    this.map.animateToRegion(this.region, 100);
  }
  closeSearch(){
    this.setState({isSearchVisible:false});
  }
  closeFilter(){
    this.setState({isFilterVisible:false});
  }
  setSearchedPlace(searchedPlace){
    this.region = {
      latitude: searchedPlace.latitude,
      longitude: searchedPlace.longitude,
      latitudeDelta: this.state.currPos.latitudeDelta,
      longitudeDelta: this.state.currPos.longitudeDelta
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
  setSelectedParking(parking){
    this.setState({selectedParking:parking},()=>{
      this.setState({panelVisible:true},()=>{
        this._panel.show(window.height * 0.38,1000);
      });
      
    }
      )
  }
  getCurrentPosition(){

    this.map.animateToRegion(
          {
            latitude: this.props.currPos.latitude,
            longitude: this.props.currPos.longitude,
            latitudeDelta: 0.00522,
            longitudeDelta: Dimensions.get("window").width / Dimensions.get("window").height * 0.00522
          },
          1000
        )
    
  }
  onBackButtonPress(){
    this.setState({panelVisible:false})
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
            />
          }
          {!this.state.isSearchVisible&&!this.state.isFilterVisible&&
            <View style={StyleSheet.absoluteFillObject}>
              <MapView
                initialRegion={this.state.currPos}
                style={{flex:1}}
                mapPadding={{ top: 100, right: 0, bottom: 0, left: 0 }}
                onMapReady={this._onMapReady}
                showsUserLocation={true}
                provider={PROVIDER_GOOGLE}
                showsMyLocationButton={true}
                followUserLocation={true}
                minPoints={5}
                minZoom={3}
                clusterColor={"#002166"}
                zoomEnabled={true}
                mapRef={ref => this.map = ref}
                onRegionChange={(initialRegion)=>{this.onRegionChange(initialRegion)}}
            >

                    {this.props.parking.map((parking) => (
                            <Marker key= {parking.prkplceNo} onPress={()=>{this.setSelectedParking(parking)}} coordinate={{ latitude: parseFloat(parking.latitude), longitude: parseFloat(parking.longitude) }}>
                                <CustomMarker price={parking.basicCharge}/>
                            </Marker> 
                    ))}
              <Marker coordinate={{latitude: 35.2538633, longitude: 128.6402609}} onClick={this.toggleModal.bind(this)}/>
              {this.state.searchedPlace&&
                <Marker coordinate={{ latitude: this.state.searchedPlaceData.latitude, longitude:  this.state.searchedPlaceData.longitude}}/>
              }
            </MapView>
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
              <TouchableOpacity
                style={styles.zoomin}
                onPress={() => { this.onPressZoomIn() }}
              >
                <Icon
                  name="add"
                  style={{...styles.icon,backgroundColor: 'rgba(255, 255, 255, 0.6)',color: 'rgba(0, 0, 0, 0.8)'}}
                  size={25}
                />
            </TouchableOpacity>
              <TouchableOpacity
                style={styles.zoomout}
                onPress={() => { this.onPressZoomOut() }}
              >
                <Icon
                  name="remove"
                  style={{...styles.icon,backgroundColor: 'rgba(255, 255, 255, 0.6)',color: 'rgba(0, 0, 0, 0.8)'}}
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
            />
          </AnimatedHideView>
          <PathDisplay ModalVisible={this.state.ModalVisible}/>
            {this.state.panelVisible&&
              <SlidingUpPanel 
                ref={c => (this._panel = c)}
                style={styles.panel}
                backdropOpacity={0}
                onBackButtonPress={()=>{this.onBackButtonPress()}}
                snappingPoints={[
                window.height * 0.38,
                window.height * 0.7,
                window.height * 0.85,]}
              >              
              <MarkerDisplay 
                parking={this.state.selectedParking}
              />
            </SlidingUpPanel>
            }

             
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
    zoomin:{
      position:'absolute',
      top:300,
      zIndex:2,
      left:window.width-50,
    },
    zoomout:{
      position:'absolute',
      top:340,
      zIndex:2,
      left:window.width-50
    },
    myLocation:{
      position:'absolute',
      top:110,
      zIndex:2,
      left:window.width-50,
    }
  });