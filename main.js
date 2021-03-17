import React, {Component} from 'react';
import { StyleSheet, SafeAreaView,View, TouchableOpacity, Text, ScrollView, Dimensions, Animated } from 'react-native';
import { SearchBar } from 'react-native-elements';
import NaverMapView, {Circle, Marker, Path, Polyline, Polygon} from "react-native-nmap";
import Icon from 'react-native-vector-icons/Ionicons';
import SlidingUpPanel from 'rn-sliding-up-panel'
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
         snappingPoints={[
         window.height * 0.4,
         window.height * 0.7,
         window.height * 0.85,]}
         
         >
          {dragHandler => (
            <View style={styles.container}>
              <View style={styles.dragHandler} {...dragHandler}>

            {/* <Icon tyle={styles.naviIcon} name="navigate-circle-sharp" size={24} color="blue"/> */}
                <Text>주차장 이름</Text>
              </View>
              <ScrollView>
                
                <Text>여기 내용</Text>

              </ScrollView>
            </View>
          )}
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
    dragHandler: {
      height: 64,
      backgroundColor: '#BCBCBC',
    },
    naviIcon: {
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      top: -24,
      right: 18,
      width: 48,
      height: 48,
      zIndex: 1
    },

  });