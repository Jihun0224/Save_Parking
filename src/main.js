import React, {Component} from 'react';
import { StyleSheet, Modal, SafeAreaView,View, TouchableOpacity, Text, Dimensions,ImageBackground } from 'react-native';
import NaverMapView, {Marker} from "react-native-nmap";
import SlidingUpPanel from 'rn-sliding-up-panel';
import ParkingMarkerDisplay from './parkingMarkerDisplay';
import AnimatedHideView from 'react-native-animated-hide-view';
import Search from './Search';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Filter from './filter';
import ParkingMarker from './parkingMarker';
import AreaMarkerDisplay from './areaMarkerDisplay';
import AreaMarker from './areaMarker';
window = Dimensions.get('window');
let data = [];
export default class Main extends Component{
  constructor(props){
    super(props);
    this.state={
      level_latitude:0.0002,
      level_longitude:0.00013,
      zoomlevel:0,
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
     filteredParkingData:this.props.parking,
     filteredAreaData:this.props.area,
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
        this.setState({filteredParkingData:this.props.parking})
      }
      else if(filterOption.public == true && filterOption.private == false && filterOption.free == false){
        let NewData = [];
        this.props.parking.forEach(parking => {
          if (parking.prkplceSe == '공영') {
            NewData.push(parking);
          }
        });
        this.setState({filteredParkingData:NewData})
      }
      else if(filterOption.public == true && filterOption.private == true && filterOption.free == false){
        let NewData = [];
          this.props.parking.forEach(parking => {
            if (parking.parkingchrgeInfo != '무료') {
              NewData.push(parking);
            }
          })
        this.setState({filteredParkingData:NewData})
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
        this.setState({filteredParkingData:NewData2})
      }
      else if(filterOption.public == false && filterOption.private == true && filterOption.free == false){
        let NewData = [];
          this.props.parking.forEach(parking => {
            if (parking.prkplceSe != '공영') {
              NewData.push(parking);
            }
          })
        this.setState({filteredParkingData:NewData})
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
        this.setState({filteredParkingData:NewData2})
      }
      else if(filterOption.public == false && filterOption.private == false && filterOption.free == true){
        let NewData = [];
          this.props.parking.forEach(parking => {
            if (parking.parkingchrgeInfo == '무료') {
              NewData.push(parking);
            }
          })
        this.setState({filteredParkingData:NewData})
      }
      else{
        this.setState({filteredParkingData:[]})
      }

      if(filterOption.areaAll == true){
        this.setState({filteredAreaData:this.props.area})
      }
      else if(filterOption.cctv == true && filterOption.car == false && filterOption.smart == false){
        let NewData = [];
        this.props.area.forEach(area => {
          if (area.ctlType!= '스마트폰단속'&&area.ctlType!= '인력단속') {
            NewData.push(area);
          }
        });
        this.setState({filteredAreaData:NewData})
      }
      else if(filterOption.cctv == true && filterOption.car == true && filterOption.smart == false){
        let NewData = [];
        this.props.area.forEach(area => {
          if (area.ctlType != '스마트폰단속') {
            NewData.push(area);
          }
        });
        this.setState({filteredAreaData:NewData})
      }
      else if(filterOption.cctv == true && filterOption.car == false && filterOption.smart == true){
        let NewData = [];
        this.props.area.forEach(area => {
          if (area.ctlType != '인력단속') {
            NewData.push(area);
          }
        });
        this.setState({filteredAreaData:NewData})
      }
      else if(filterOption.cctv == false && filterOption.car == true && filterOption.smart == false){
        let NewData = [];
        this.props.area.forEach(area => {
          if (area.ctlType == '인력단속') {
            NewData.push(area);
          }
        });
        this.setState({filteredAreaData:NewData})
      }
      else if(filterOption.cctv == false && filterOption.car == true && filterOption.smart == true){
        let NewData = [];
        this.props.area.forEach(area => {
          if (area.ctlType == '인력단속'||area.ctlType == '스마트폰단속') {
            NewData.push(area);
          }
        });
        this.setState({filteredAreaData:NewData})
      }
      else if(filterOption.cctv == false && filterOption.car == false && filterOption.smart == true){
        let NewData = [];
        this.props.area.forEach(area => {
          if (area.ctlType == '스마트폰단속') {
            NewData.push(area);
          }
        });
        this.setState({filteredAreaData:NewData})
      }
      else{
        this.setState({filteredAreaData:[]})
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

  // ConfirmZoom(current){
  //   console.log(current.zoom)
  //   let max_latitude = "";
  //   let min_latitude = "";
  //   let max_longitude = "";
  //   let min_longitude = "";
  //   let clustering_data = [];
  //   data = []

  //   if(current.zoom>=16){
  //    max_latitude = current.latitude+this.state.level_latitude*16
  //    min_latitude = current.latitude-this.state.level_latitude*16
  //    max_longitude = current.longitude+this.state.level_longitude*16
  //    min_longitude = current.longitude-this.state.level_longitude*16
     
  //    for(let i=0; i<this.state.filteredParkingData.length; i++){
  //      if(this.state.filteredParkingData[i].latitude<=max_latitude&&this.state.filteredParkingData[i].latitude>=min_latitude&&this.state.filteredParkingData[i].longitude<=max_longitude&&this.state.filteredParkingData[i].longitude>=min_longitude){
  //         clustering_data.push(this.state.filteredParkingData[i])
          
  //      }
  //      else{}
  //    }
  //    for(let i=0; i<clustering_data.length; i++){
  //         data[i]= (<Marker 
  //                       key= {i} 
  //                       onClick={()=>{this.setSelectedParking(clustering_data[i])}} 
  //                       coordinate={{ 
  //                         latitude: clustering_data[i].latitude, 
  //                         longitude: clustering_data[i].longitude}}
  //                       width={35} 
  //                       height={35}
  //                       pinColor="#002166"
  //                       image={require('./images/speech-bubble.png')}
  //                       caption={{text: "₩600",textSize:13,color:"#ffffff",haloColor:'none',align:Align.Center}}
                      
  //                     >
  //                       {/* <ParkingMarker 
  //                             basicCharge={parking.basicCharge}
  //                             basicTime={parking.basicTime}
  //                             parkingchrgeInfo={parking.parkingchrgeInfo}
  //                             monthCmmtkt={parking.monthCmmtkt}
  //                       /> */}
  //                     </Marker>)
  //     }
  //   }
    
  //   else if(current.zoom>=15){
      
  //     max_latitude = current.latitude+this.state.level_latitude*32
  //     min_latitude = current.latitude-this.state.level_latitude*32
  //     max_longitude = current.longitude+this.state.level_longitude*32
  //     min_longitude = current.longitude-this.state.level_longitude*32
      
  //     for(let i=0; i<this.state.filteredParkingData.length; i++){
  //       if(this.state.filteredParkingData[i].latitude<=max_latitude&&this.state.filteredParkingData[i].latitude>=min_latitude&&this.state.filteredParkingData[i].longitude<=max_longitude&&this.state.filteredParkingData[i].longitude>=min_longitude){
  //          clustering_data.push(this.state.filteredParkingData[i])
           
  //       }
  //       else{}
  //     }
  //      this.Clustering(1600, clustering_data)
      
  //    }
  //    else if(current.zoom>=14){
      
  //     max_latitude = current.latitude+this.state.level_latitude*64
  //     min_latitude = current.latitude-this.state.level_latitude*64
  //     max_longitude = current.longitude+this.state.level_longitude*64
  //     min_longitude = current.longitude-this.state.level_longitude*64
      
  //     for(let i=0; i<this.state.filteredParkingData.length; i++){
  //       if(this.state.filteredParkingData[i].latitude<=max_latitude&&this.state.filteredParkingData[i].latitude>=min_latitude&&this.state.filteredParkingData[i].longitude<=max_longitude&&this.state.filteredParkingData[i].longitude>=min_longitude){
  //          clustering_data.push(this.state.filteredParkingData[i])
           
  //       }
  //       else{}
  //     }
  //     this.Clustering(1225, clustering_data)
      
  //    }
  //   else if(current.zoom>=13)
  //   {
  //     max_latitude = current.latitude+this.state.level_latitude*128
  //     min_latitude = current.latitude-this.state.level_latitude*128
  //     max_longitude = current.longitude+this.state.level_longitude*128
  //     min_longitude = current.longitude-this.state.level_longitude*128
      
  //     for(let i=0; i<this.state.filteredParkingData.length; i++){
  //       if(this.state.filteredParkingData[i].latitude<=max_latitude&&this.state.filteredParkingData[i].latitude>=min_latitude&&this.state.filteredParkingData[i].longitude<=max_longitude&&this.state.filteredParkingData[i].longitude>=min_longitude){
  //          clustering_data.push(this.state.filteredParkingData[i])
           
  //       }
  //       else{}
  //     }
  //     this.Clustering(900, clustering_data)
  //   }
  //   else if(current.zoom>=12){
      
  //     max_latitude = current.latitude+this.state.level_latitude*256
  //     min_latitude = current.latitude-this.state.level_latitude*256
  //     max_longitude = current.longitude+this.state.level_longitude*256
  //     min_longitude = current.longitude-this.state.level_longitude*256
      
  //     for(let i=0; i<this.state.filteredParkingData.length; i++){
  //       if(this.state.filteredParkingData[i].latitude<=max_latitude&&this.state.filteredParkingData[i].latitude>=min_latitude&&this.state.filteredParkingData[i].longitude<=max_longitude&&this.state.filteredParkingData[i].longitude>=min_longitude){
  //          clustering_data.push(this.state.filteredParkingData[i])
           
  //       }
  //       else{}
  //     }
  //     this.Clustering(400, clustering_data)
  //    }
  //    else if(current.zoom>=11){
      
  //     max_latitude = current.latitude+this.state.level_latitude*512
  //     min_latitude = current.latitude-this.state.level_latitude*512
  //     max_longitude = current.longitude+this.state.level_longitude*512
  //     min_longitude = current.longitude-this.state.level_longitude*512
      
  //     for(let i=0; i<this.state.filteredParkingData.length; i++){
  //       if(this.state.filteredParkingData[i].latitude<=max_latitude&&this.state.filteredParkingData[i].latitude>=min_latitude&&this.state.filteredParkingData[i].longitude<=max_longitude&&this.state.filteredParkingData[i].longitude>=min_longitude){
  //          clustering_data.push(this.state.filteredParkingData[i])
           
  //       }
  //       else{}
  //     }
  //     this.Clustering(100, clustering_data)
  //    }
  //   else if(current.zoom>=10){
      
  //    max_latitude = current.latitude+this.state.level_latitude*1024
  //    min_latitude = current.latitude-this.state.level_latitude*1024
  //    max_longitude = current.longitude+this.state.level_longitude*1024
  //    min_longitude = current.longitude-this.state.level_longitude*1024

  //    for(let i=0; i<this.state.filteredParkingData.length; i++){
  //      if(this.state.filteredParkingData[i].latitude<=max_latitude&&this.state.filteredParkingData[i].latitude>=min_latitude&&this.state.filteredParkingData[i].longitude<=max_longitude&&this.state.filteredParkingData[i].longitude>=min_longitude){
  //         clustering_data.push(this.state.filteredParkingData[i])
          
  //      }
  //      else{}
  //    }
  //    this.Clustering(25, clustering_data)
  //   }
  //   else if (current.zoom>=9){
      
  //    max_latitude = current.latitude+this.state.level_latitude*4096
  //    min_latitude = current.latitude-this.state.level_latitude*4096
  //    max_longitude = current.longitude+this.state.level_longitude*4096
  //    min_longitude = current.longitude-this.state.level_longitude*4096
     
  //    for(let i=0; i<this.state.filteredParkingData.length; i++){
  //      if(this.state.filteredParkingData[i].latitude<=max_latitude&&this.state.filteredParkingData[i].latitude>=min_latitude&&this.state.filteredParkingData[i].longitude<=max_longitude&&this.state.filteredParkingData[i].longitude>=min_longitude){
  //         clustering_data.push(this.state.filteredParkingData[i])
          
  //      }
  //      else{}
  //    }
  //    this.Clustering(9, clustering_data)
  //   }
  //   else{
      
  //    max_latitude = current.latitude+this.state.level_latitude*30000
  //    min_latitude = current.latitude-this.state.level_latitude*30000
  //    max_longitude = current.longitude+this.state.level_longitude*30000
  //    min_longitude = current.longitude-this.state.level_longitude*30000
     

  //    for(let i=0; i<this.state.filteredParkingData.length; i++){
  //      if(this.state.filteredParkingData[i].latitude<=max_latitude&&this.state.filteredParkingData[i].latitude>=min_latitude&&this.state.filteredParkingData[i].longitude<=max_longitude&&this.state.filteredParkingData[i].longitude>=min_longitude){
  //         clustering_data.push(this.state.filteredParkingData[i])
          
  //      }
  //      else{}
  //    }
  //    this.Clustering(1, clustering_data)
  //   }
  // }  

  // Clustering(k, clustering_data){ //마커를 몇개로 할 건지의 
  //   let centroid_lat = [];
  //   let centroid_lon = []; 
  //   let distance = [];
  //   let label = [];
  //   let lat_avg = [];
  //   let lon_avg = [];
  //   let num =[];
  //   let lab = 0;
  //   let min = 0;
  //   let lat = 0;
  //   let lon = 0;
  //   let plus = 0;

  //   if(k!=1){
  //     for(let i=0;i<Math.sqrt(k); i++){
  //       lat += 0.23/(Math.sqrt(k)-1)
  //       lon = 0

  //       for(let j=0; j<Math.sqrt(k); j++){
  //         centroid_lat[plus] = 35.03+lat //초기 중심점
  //         centroid_lon[plus] = 128.94+lon
  //         lon += 0.32/(Math.sqrt(k)-1)
  //         plus++
  //       }
  //     }
      
  //   }
  //   else{
  //     centroid_lat[k] = 35.03;
  //     centroid_lon[k] = 128.94;
  //   }
  //   for(let i=0; i<k; i++){ //초기화
  //       num[i] = 0
  //       lon_avg[i] = 0
  //       lat_avg[i] = 0
  //   }
  //   for(let p=0; p<4; p++){
  //     for(let i=0; i<clustering_data.length; i++){ //군집 나눠주는 구간
  //       for(let j=0; j<k; j++){
  //         distance[j] = Math.sqrt(Math.pow((centroid_lat[j]-Number(clustering_data[i].latitude)),2) + Math.pow((centroid_lon[j]-Number(clustering_data[i].longitude)),2))
  //       }
        
  //       min = Math.min.apply(null,distance) //중심점과 최소거리
  //       lab = distance.indexOf(min)
  //       label [i] = lab //군집선택
  //     }

  //     for(let i=0; i<k; i++){
  //       centroid_lat[i] = 0 //중심점 초기화
  //       centroid_lon[i] = 0
  //     }

  //     for(let i=0; i<clustering_data.length; i++){
  //       for(let j=0; j<k; j++){
  //         if(j==label[i] && centroid_lat[j] != 0 && centroid_lon[j] != 0){ //군집마다 평균 중심점 새로 설정
  //           centroid_lat[j] = (centroid_lat[j] + Number(clustering_data[i].latitude))/2
  //           centroid_lon[j] = (centroid_lon[j] + Number(clustering_data[i].longitude))/2
  //         }
  //         else if(j==label[i] && centroid_lat[j] == 0 && centroid_lon[j] == 0){ //중심점 없으면 그냥 넣어주기
  //           centroid_lat[j] = Number(clustering_data[i].latitude)
  //           centroid_lon[j] = Number(clustering_data[i].longitude)
  //         }
  //       }
  //     }
  //   }

  //   for(let i = 0; i<clustering_data.length; i++){
  //     for(let j = 0; j<k; j++){
  //       if(label[i]==j){
  //         num[j]++; //마커개수
  //         if(lat_avg[j] == 0 && lon_avg[j] == 0){
  //           lat_avg[j] = Number(clustering_data[i].latitude) 
  //           lon_avg[j] = Number(clustering_data[i].longitude)
  //         }
  //         else{
  //           lat_avg[j] = (lat_avg[j] + Number(clustering_data[i].latitude))/2 //마커위치 평균
  //           lon_avg[j] = (lon_avg[j] + Number(clustering_data[i].longitude))/2
  //         }
  //       }
  //       else{}
  //     }
  //   }

  //   for(let j=0; j<k; j++){
  //      if(num[j] == 1){ //기본 마커 출력
  //           data[j]= (<Marker 
  //                       key= {j} 
  //                       onClick={()=>{this.setSelectedParking({latitude:lat_avg[j], longitude:lon_avg[j]})}} 
  //                       coordinate={{ 
  //                         latitude: lat_avg[j], 
  //                         longitude: lon_avg[j]}}
  //                       width={35} 
  //                       height={35}
  //                       pinColor="#002166"
  //                       image={require('./images/speech-bubble.png')}
  //                       caption={{text: "₩600",textSize:13,color:"#ffffff",haloColor:'none',align:Align.Center}}
                      
  //                     >
  //                       {/* <ParkingMarker 
  //                             basicCharge={parking.basicCharge}
  //                             basicTime={parking.basicTime}
  //                             parkingchrgeInfo={parking.parkingchrgeInfo}
  //                             monthCmmtkt={parking.monthCmmtkt}
  //                       /> */}
  //                     </Marker>)
          
  //      }
  //      else if(num[j] > 1){
  //                       //마커 합계 출력
  //           data[j]=(<Marker 
  //                     key={j}
  //                     coordinate={{latitude: lat_avg[j], longitude: lon_avg[j]}}
  //                     width={50}
  //                     height={50}
  //                     pinColor="#002166"
  //                     image={require('./images/circle.png')}
  //                     caption={{text: String(num[j]) ,textSize:14,color:"#000000",haloColor:'none',align:Align.Center}}
  //                     //onClick={()=> {this.setCurrentMarker(lat_avg[j], lon_avg[j])}}
  //                     >
  //                     </Marker>
  //                   )
  //       }
  //      else{}
  //   }
    
  // }

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
                onCameraChange={e => this.setState({zoomlevel:e})}
              >
                <Marker 
                  coordinate={{ 
                    latitude: this.props.currPos.latitude, 
                    longitude: this.props.currPos.longitude}}
                  width={30} 
                  height={40}
                  pinColor='blue'
                />

                {this.state.filteredParkingData.map((parking,index) => (
                  <ParkingMarker 
                    key={index}
                    index={index}
                    parking={parking}
                    setSelectedParking={this.setSelectedParking.bind(this)} 
                    />
                ))}
            {this.state.filteredAreaData.map((area,index) => (
                    <AreaMarker
                    key={index}
                    index={index}
                    area={area}
                    setSelectedArea={this.setSelectedArea.bind(this)} 
                    />
                ))}               
              {this.state.searchedPlace&&
                <Marker 
                coordinate={{ 
                  latitude:this.state.searchedPlaceData.latitude, 
                  longitude:this.state.searchedPlaceData.longitude}}
                width={80} 
                height={50}
                image={require('./images/marker.png')}
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
            <Modal 
              animationType="slide"
              visible={this.state.overlayVisible}
              style={styles.overlay}
              transparent={true}
              area={this.state.selectedArea}
              onBackdropPress={()=>{
                this.closeOverlay()
              }}
            >
              <AreaMarkerDisplay
                area = {this.state.selectedArea}
                closeOverlay={this.closeOverlay.bind(this)}
              />
            </Modal>                  
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
    },
    avg_marker:{
      width:70,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center'
    }
  });