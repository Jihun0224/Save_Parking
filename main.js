import React, {Component} from 'react';
import { StyleSheet, SafeAreaView,View, TouchableOpacity, Text, Dimensions } from 'react-native';
import { SearchBar } from 'react-native-elements';
import NaverMapView, {Circle, Marker, Path, Polyline, Polygon} from "react-native-nmap";
import Icon from 'react-native-vector-icons/Ionicons';
import SlidingUpPanel from 'rn-sliding-up-panel';
import MarkerDisplay from './MarkerDisplay';
window = Dimensions.get('window');


export default class Main extends Component{
  constructor(){
    super();
    this.state={
        search:'',
    }
  }

  searchTextInputChanged(text) {
    this.setState({ searchedText: text })
  }
  

  render(){
    const currPos = {latitude: this.props.currPos.latitude, longitude: this.props.currPos.longitude};
    return (
      <SafeAreaView style={styles.container}>
            <SearchBar 
            style="auto"
                      platform="android"
                      onChangeText = {(text) => this.searchTextInputChanged(text)}
                      containerStyle={{borderWidth: 1, borderRadius: 15,}}
                      searchIcon={<Icon name="location" size={24} color="gray"/>}
                      placeholder='장소를 입력해 주세요.'/>

            <View style={styles.map}>
            <NaverMapView style={{width: '100%', height: '100%'}}
                          showsMyLocationButton={true}
                          center={{...currPos, zoom: 16}}
                          >
            
              <Marker coordinate={currPos} onClick={() => this._panel.show(window.height * 0.4)}/>

            </NaverMapView>

        <SlidingUpPanel ref={c => (this._panel = c)}
        backdropOpacity={0}
         snappingPoints={[
         window.height * 0.4,
         window.height * 0.7,
         window.height * 0.85,]}
         
         >
            <View style={styles.container}>
              {/* 여기 마커데이터 전달*/}
            <MarkerDisplay />
            </View>         
        </SlidingUpPanel>
            </View>
            
      </SafeAreaView>
    )}
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      zIndex: 1,
      backgroundColor: 'white',
    },
    map:{
      flex:1,
    },

  });